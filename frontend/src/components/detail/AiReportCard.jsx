import { AlertTriangle, BadgeCheck, Clock } from "lucide-react";
import { useLang } from "../../i18n";

// AI report box: header + clean status badge + short localized summary.
// Intentionally shows no percentages, model names or raw (English) check logs.
export default function AiReportCard({ report, status }) {
  const { t, pick } = useLang();
  const r = report || {};
  const ok = status ? status === "VERIFIED" : (r.score ?? 0) >= 0.8;

  // Prefer a localized summary from the API (summary_ru / summary_kg); otherwise use the dictionary text.
  const apiSummary = pick(r, "summary");
  const summary = apiSummary || t(ok ? "aiSummaryOk" : "aiSummaryWait");

  return (
    <div className="bg-jd-50 rounded-3xl p-6">
      <h3 className="font-bold">{t("ai")}</h3>
      <div className="mt-3">
        <span
          className={`inline-flex items-center gap-1.5 h-8 px-4 rounded-full text-xs font-bold text-white ${ok ? "bg-jd-ok" : "bg-jd-wait"}`}
        >
          {ok ? <BadgeCheck size={15} /> : <Clock size={14} />}
          {ok ? t("verified") : t("pending")}
        </span>
      </div>
      <ul className="mt-4 space-y-1.5 text-sm text-jd-deep">
        <li className="flex gap-2">
          {ok ? <BadgeCheck size={16} className="mt-0.5 shrink-0 text-jd-ok" /> : <Clock size={16} className="mt-0.5 shrink-0 text-jd-wait" />}
          <span>{summary}</span>
        </li>
        {!ok && (r.red_flags ?? []).length > 0 && (
          <li className="flex gap-2 text-jd-wait">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
            <span>{t("aiFlagsNote")}</span>
          </li>
        )}
      </ul>
    </div>
  );
}
