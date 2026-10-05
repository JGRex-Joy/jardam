import { m } from "framer-motion";

/** Transform-only progress fill (no width/layout animation). */
export const Progress = ({ pct, h = "h-2" }) => {
  const p = Math.max(0, Math.min(100, pct || 0));
  return (
    <div className={`${h} bg-jd-50 rounded-full overflow-hidden`}>
      <m.div className="h-full w-full bg-jd rounded-full will-change-transform"
        initial={{ x: "-100%" }} whileInView={{ x: `${p - 100}%` }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 0.9, ease: "easeOut" }} />
    </div>
  );
};
