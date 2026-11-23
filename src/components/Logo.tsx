export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="AML/KYC Wiki logo"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="amlk-logo-bg" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6ee7b7" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="8" fill="url(#amlk-logo-bg)" className="logo-bg" />
      <rect x="1" y="1" width="30" height="30" rx="8" stroke="#34d399" strokeOpacity="0.4" strokeWidth="1" />
      {/* shield */}
      <path
        d="M16 8.5 23.5 11.5v5.2c0 4.1-3 7-7.5 8.8-4.5-1.8-7.5-4.7-7.5-8.8v-5.2L16 8.5Z"
        fill="#052e1b"
        fillOpacity="0.9"
        className="logo-shield"
      />
      {/* check */}
      <path
        d="m12.2 16.4 2.6 2.6 5-5.4"
        stroke="#6ee7b7"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className="logo-check"
      />
      {/* flow dots — money movement */}
      <circle cx="25.5" cy="6.5" r="1.4" fill="#a7f3d0" className="logo-dot logo-dot-a" />
      <circle cx="27.5" cy="9" r="1" fill="#a7f3d0" opacity="0.6" className="logo-dot logo-dot-b" />
    </svg>
  );
}
