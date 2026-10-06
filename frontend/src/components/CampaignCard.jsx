import { memo } from "react";
import { Link } from "react-router-dom";
import { useLang, som } from "../i18n";
import VerificationBadge from "./VerificationBadge";
import { Progress } from "./Motion";

const thumb = (url = "") => url.replace("w=1000", "w=640"); // smaller image for cards

export default memo(function CampaignCard({ c, i = 0 }) {
  const { t, pick } = useLang();
  if (!c) return null;
  const pct = c.target > 0 ? Math.min(100, Math.round(((c.raised ?? 0) / c.target) * 100)) : 0;
  return (
    <div className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}>
      <div className="group relative transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none">
        {/* elevation = opacity fade of a pre-painted shadow (no box-shadow animation) */}
        <span aria-hidden className="absolute inset-0 rounded-3xl shadow-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <Link to={`/campaigns/${c.id}`} className="relative block overflow-hidden rounded-3xl bg-white shadow-sm">
          <img src={thumb(c.cover_url)} alt={pick(c, "title")} loading="lazy" decoding="async" className="h-48 w-full object-cover bg-jd-50" />
          <div className="p-5">
            <h3 className="font-bold leading-snug line-clamp-2 min-h-[2.75rem]">{pick(c, "title")}</h3>
            <div className="mt-2 h-7"><VerificationBadge status={c.status} /></div>
            <p className="text-sm text-jd-mute mt-3 line-clamp-2 min-h-[2.5rem]">{pick(c, "summary")}</p>
            <div className="mt-4"><Progress pct={pct} /></div>
            <div className="flex justify-between text-sm mt-2"><b className="text-jd-deep">{som(c.raised)}</b><span className="text-jd-mute">{t("goal")} {som(c.target)}</span></div>
            <div className="flex justify-between text-xs text-jd-mute mt-2"><span>{c.donors ?? 0} {t("donors")}</span><span>{c.days_left ?? 0} {t("days")}</span></div>
          </div>
        </Link>
      </div>
    </div>
  );
});
