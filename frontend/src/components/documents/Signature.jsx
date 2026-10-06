export default function Signature({ color = "#1e3a8a" }) {
  return (
    <svg viewBox="0 0 120 40" className="w-28 h-10" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <path d="M4 28c10-22 16-24 14-8-2 14 6 12 14-6 5-11 8 8 14 6s9-14 14-8c4 5-2 12 8 8s16-6 24-12" />
      <path d="M30 34c20-4 50-6 84-2" strokeWidth="1" />
    </svg>
  );
}
