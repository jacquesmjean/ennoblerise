export default function SunriseArc({
  className = '',
  tone = 'gold',
}: {
  className?: string;
  tone?: 'gold' | 'navy';
}) {
  const stroke = tone === 'gold' ? '#C9A227' : '#0A1828';
  return (
    <svg
      viewBox="0 0 320 96"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 88C58 34 122 8 160 8s102 26 144 80" stroke={stroke} strokeWidth="1.2" opacity="0.85" />
      <path d="M52 88c30-38 76-56 108-56s78 18 108 56" stroke={stroke} strokeWidth="0.9" opacity="0.5" />
      <path d="M92 88c20-24 46-36 68-36s48 12 68 36" stroke={stroke} strokeWidth="0.7" opacity="0.3" />
      <circle cx="160" cy="64" r="13" fill={stroke} opacity="0.9" />
      <line x1="0" y1="88.5" x2="320" y2="88.5" stroke={stroke} strokeWidth="0.8" opacity="0.55" />
    </svg>
  );
}
