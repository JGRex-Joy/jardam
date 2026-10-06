import { BadgeCheck, Clock } from "lucide-react";
import { useLang } from "../i18n";

// Simplified status badge: green "verified" / amber "under review". No scores or model names.
export default function VerificationBadge({ status }) {
  const { t } = useLang();
  const ok = status === "VERIFIED";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center gap-1.5 h-7 px-3.5 whitespace-nowrap text-[11px] font-bold text-white rounded-full ${ok ? "bg-jd-ok" : "bg-jd-wait"}`}
    >
      {ok ? <BadgeCheck size={14} /> : <Clock size={13} />}
      {ok ? t("verified") : t("pending")}
    </span>
  );
}
