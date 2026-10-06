import { useId } from "react";

/** Circular stamp: ring text along the top arc, centre mark, double border. */
export default function Seal({ top = "", center = "", bottom = "★ ★ ★", color = "#1d4ed8", size = 112, rotate = -12 }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden className="opacity-80 mix-blend-multiply shrink-0" style={{ transform: `rotate(${rotate}deg)` }}>
      <defs><path id={id} d="M60,60 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke={color} strokeWidth="3" />
      <circle cx="60" cy="60" r="50" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="60" cy="60" r="28" fill="none" stroke={color} strokeWidth="1.5" />
      <text fill={color} fontSize="9" fontWeight="700" letterSpacing="1"><textPath href={`#${id}`} startOffset="25%" textAnchor="middle">{top.toUpperCase().slice(0, 28)}</textPath></text>
      <text x="60" y="58" textAnchor="middle" fill={color} fontSize="12" fontWeight="800">{center}</text>
      <text x="60" y="72" textAnchor="middle" fill={color} fontSize="7">{bottom}</text>
    </svg>
  );
}
