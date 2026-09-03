/**
 * Marquee — an infinite cinematic ticker strip used
 * between chapters. Pure CSS animation, duplicated
 * content for a seamless loop, paused when the user
 * prefers reduced motion.
 */
export default function Marquee({
  items,
  className = "",
  duration = 30,
}: {
  items: string[];
  className?: string;
  duration?: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div
      className={`overflow-hidden border-y border-paper/8 py-4 ${className}`}
      aria-hidden="true"
    >
      <div
        className="marquee-track flex w-max items-center gap-10 whitespace-nowrap"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-mono text-[10px] uppercase tracking-[0.4em] text-paper-faint"
          >
            {item}
            <span className="text-gold/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
