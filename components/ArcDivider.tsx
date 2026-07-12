/**
 * Rising-arc section divider — the brand's "rise" made structural.
 * Renders a gentle upward arc in `fill` color, sitting on top of the section below.
 * Place at the TOP of a section: the arc curves up like a sunrise horizon.
 */
export default function ArcDivider({
  fill = '#ffffff',
  className = '',
  flip = false,
}: {
  fill?: string;
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 110"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`arc-divider ${className}`}
      style={flip ? { transform: 'rotate(180deg)' } : undefined}
    >
      <path d="M0,110 C360,10 1080,10 1440,110 L1440,110 L0,110 Z" fill={fill} />
      <path
        d="M0,110 C360,10 1080,10 1440,110"
        fill="none"
        stroke="#FBBF24"
        strokeWidth="2"
        opacity="0.65"
      />
    </svg>
  );
}
