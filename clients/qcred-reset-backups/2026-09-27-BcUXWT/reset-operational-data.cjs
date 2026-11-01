// One-time QCred operational reset. Dry-run by default; --apply commits.
// Keep this beside the pre-reset database dump, never in the deployed app.
const { createRequire } = require('node:module')
const { randomBytes } = require('node:crypto')
const requireApp = createRequire('/Users/prabhas/24dev/clients/qcred-crm/package.json')
const postgres = requireApp('postgres')
const bcrypt = requireApp('bcryptjs')

const apply = process.argv.includes('--apply')
const expected = {
  users: 15,
  leads: 0,
  partners: 5,
  cfCases: 2,
  onboarding: 11,
  onboardingMail: 30,
  employeeApplications: 26,
}
const phone = '9967577889'
const password = randomBytes(18).toString('base64url')
const sql = postgres(process.env.DATABASE_URL, { max: 1 })

async function snapshot(tx) {
  const [row] = await tx`
    SELECT
      (SELECT count(*)::int FROM users) AS users,
      (SELECT count(*)::int FROM leads) AS leads,
      (SELECT count(*)::int FROM partners) AS partners,
      (SELECT count(*)::int FROM cf_cases) AS "cfCases",
      (SELECT count(*)::int FROM onboarding_applications) AS onboarding,
      (SELECT count(*)::int FROM onboarding_mail) AS "onboardingMail",
      (SELECT count(*)::int FROM website_employee_applications) AS "employeeApplications"
  `
  return row
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL missing')
  if (!apply) console.log('DRY RUN — all changes will be rolled back')
  try {
    await sql.begin(async tx => {
      const before = await snapshot(tx)
      console.log('Before:', before)
      for (const [key, value] of Object.entries(expected)) {
        if (before[key] !== value) throw new Error(`Guard failed: ${key} changed from ${value} to ${before[key]}`)
      }
      const [role] = await tx`SELECT id FROM roles WHERE key = 'super_admin'`
      if (!role) throw new Error('Super Admin role missing')

      // These are user/lead activity records, not application submissions.
      // Preserve the application inbox, its email state, and its review history.
      const commands = [
        ['approvals', 'DELETE FROM approvals'],
        ['announcements', 'DELETE FROM announcements'],
        ['escalations', 'DELETE FROM escalations'],
        ['invites', 'DELETE FROM invites'],
        ['payouts', 'DELETE FROM payouts'],
        ['disbursements', 'DELETE FROM disbursements'],
        ['leads', 'DELETE FROM leads'],
        ['cf_cases', 'DELETE FROM cf_cases'],
        ['marketing_downloads', 'DELETE FROM marketing_downloads'],
        ['partners', 'DELETE FROM partners'],
        ['notifications', 'DELETE FROM notifications'],
        ['verifications', 'DELETE FROM verifications'],
        ['user_audit', "DELETE FROM audit_log WHERE entity_type NOT IN ('onboarding', 'data_reset')"],
        ['onboarding_audit_actor', 'UPDATE audit_log SET actor_id = NULL WHERE actor_id IS NOT NULL'],
        ['lenders_actor', 'UPDATE lenders SET created_by = NULL, approved_by = NULL WHERE created_by IS NOT NULL OR approved_by IS NOT NULL'],
        ['programs_actor', 'UPDATE lender_programs SET created_by = NULL, approved_by = NULL WHERE created_by IS NOT NULL OR approved_by IS NOT NULL'],
        ['employee_invite_link', 'UPDATE website_employee_applications SET invited_user_id = NULL WHERE invited_user_id IS NOT NULL'],
        ['old_cf_drafts', "DELETE FROM settings WHERE key LIKE 'cf-intake:%'"],
        ['settings_actor', 'UPDATE settings SET updated_by = NULL WHERE updated_by IS NOT NULL'],
        ['users', 'DELETE FROM users'],
      ]
      const changed = {}
      for (const [name, statement] of commands) {
        const result = await tx.unsafe(statement)
        changed[name] = result.count
      }

      const hash = await bcrypt.hash(password, 12)
      const [admin] = await tx`
        INSERT INTO users (type, name, phone, password_hash, status, approved_at)
        VALUES ('staff', 'Bobby Singh', ${phone}, ${hash}, 'active', now())
        RETURNING id
      `
      await tx`INSERT INTO user_roles (user_id, role_id) VALUES (${admin.id}, ${role.id})`
      await tx`
        INSERT INTO audit_log (actor_id, action, entity_type, entity_id, after)
        VALUES (${admin.id}, 'operational.reset', 'data_reset', ${admin.id},
          ${JSON.stringify({ reason: 'Fresh team start; partner and employee applications preserved', changed })}::jsonb)
      `

      const after = await snapshot(tx)
      if (after.users !== 1 || after.leads !== 0 || after.partners !== 0 ||
          after.cfCases !== 0 || after.onboarding !== before.onboarding ||
          after.onboardingMail !== before.onboardingMail ||
          after.employeeApplications !== before.employeeApplications) {
        throw new Error('Post-reset invariant failed: ' + JSON.stringify(after))
      }
      console.log('Changed row counts:', changed)
      console.log('After:', after)
      if (!apply) throw new Error('DRY_RUN_ROLLBACK')
      console.log('New Super Admin mobile:', phone)
      console.log('One-time temporary password:', password)
    })
  } catch (error) {
    if (!apply && error.message === 'DRY_RUN_ROLLBACK') {
      console.log('Dry-run transaction rolled back successfully')
      return
    }
    throw error
  } finally {
    await sql.end()
  }
}

main().catch(error => {
  console.error(error.message)
  process.exitCode = 1
})
