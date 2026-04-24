import { SignUp } from "@clerk/nextjs";

export const metadata = { title: "Sign up", robots: { index: false } };

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950">
      <SignUp />
    </div>
  );
}
