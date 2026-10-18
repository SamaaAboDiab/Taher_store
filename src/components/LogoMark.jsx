export default function LogoMark({ size = 34, animate = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="50" cy="50" r="44" stroke="#C6A15B" strokeWidth="4" />
      <circle cx="50" cy="50" r="2.6" fill="#C6A15B" />
      {[0, 90, 180, 270].map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="9"
          x2="50"
          y2="16"
          stroke="#C6A15B"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="26"
        stroke="#F2F0EA"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="50"
        x2="68"
        y2="50"
        stroke="#C6A15B"
        strokeWidth="4"
        strokeLinecap="round"
        className={animate ? "origin-[50px_50px] animate-[spin_8s_linear_infinite]" : ""}
      />
    </svg>
  );
}
