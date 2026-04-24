import { Sparkles, ArrowRight, AlertTriangle, TrendingUp, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_CLAUDE_SUGGESTIONS, type ClaudeSuggestion } from "@/lib/mock-insights";

const TYPE_ICONS = {
  revenue: TrendingUp,
  ads: TrendingUp,
  mix: Sparkles,
  operational: AlertTriangle,
  strategic: Info,
} as const;

const SEVERITY_STYLES = {
  high: {
    border: "border-lime-500/40",
    accent: "text-lime-400",
    bg: "bg-lime-500/5",
  },
  medium: {
    border: "border-amber-500/30",
    accent: "text-amber-400",
    bg: "bg-amber-500/5",
  },
  info: {
    border: "border-neutral-800",
    accent: "text-neutral-400",
    bg: "bg-neutral-900",
  },
} as const;

export function ClaudeSuggestions() {
  return (
    <section className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-lime-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Claude suggestions
            </h3>
            <span className="rounded-full bg-lime-500/15 px-1.5 py-0.5 text-[10px] font-bold text-lime-400">
              {MOCK_CLAUDE_SUGGESTIONS.length}
            </span>
          </div>
          <p className="text-xs text-neutral-500">
            AI co-pilot surfaces what needs attention — review, approve, ignore
          </p>
        </div>
        <span className="rounded-full bg-neutral-800 px-2 py-1 text-[10px] text-neutral-500">
          Mock — live from W2
        </span>
      </div>

      <ul className="space-y-3">
        {MOCK_CLAUDE_SUGGESTIONS.map((s) => (
          <SuggestionItem key={s.id} suggestion={s} />
        ))}
      </ul>
    </section>
  );
}

function SuggestionItem({ suggestion }: { suggestion: ClaudeSuggestion }) {
  const Icon = TYPE_ICONS[suggestion.type];
  const styles = SEVERITY_STYLES[suggestion.severity];

  return (
    <li
      className={cn(
        "rounded-lg border p-4 transition-colors",
        styles.border,
        styles.bg,
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 h-4 w-4 flex-shrink-0", styles.accent)} />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h4 className="text-sm font-semibold text-white">{suggestion.title}</h4>
            <span className={cn("text-[10px] uppercase font-bold", styles.accent)}>
              {suggestion.severity}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-neutral-400">{suggestion.body}</p>
          {suggestion.cta && (
            <button className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-lime-400 transition-colors hover:text-lime-300">
              {suggestion.cta}
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
