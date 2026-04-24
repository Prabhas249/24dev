export function Marquee() {
  const items = [
    "Beautifully crafted",
    "Shipped in 24 hours",
    "No calls, no delays",
    "Fixed price",
    "Real code",
    "50+ founders shipped",
  ];

  const loop = [...items, ...items];

  return (
    <div className="border-y border-line bg-ink-soft/40 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {loop.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-6 py-6 font-display text-[clamp(1.75rem,5vw,5rem)] font-medium italic text-fog"
          >
            {item}
            <span className="inline-block h-2 w-2 rounded-full bg-orange" />
          </span>
        ))}
      </div>
    </div>
  );
}
