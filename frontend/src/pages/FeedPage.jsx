import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCampaigns } from "../api";
import CampaignCard from "../components/CampaignCard";
import StateCard from "../components/StateCard";
import { CardSkeletons } from "../components/Skeleton";
import { useFetch } from "../hooks/useFetch";
import { useLang } from "../i18n";

const CATEGORIES = ["all", "medical", "emergency", "ngo", "social"];

export default function FeedPage() {
  const { t } = useLang();
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [category, setCategory] = useState("all");
  const { data, loading, error, reload } = useFetch((signal) => getCampaigns(q, signal), [q], { keepPrevious: true });
  const shown = useMemo(() => (data ?? []).filter((c) => category === "all" || c.category === category), [data, category]);

  if (error) return <StateCard detail={error.message} onRetry={reload} />;
  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-4">
        {CATEGORIES.map((k) => (
          <button key={k} onClick={() => setCategory(k)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap ${category === k ? "bg-jd-deep text-white" : "bg-white text-jd-mute"}`}>{t(k)}</button>
        ))}
      </div>
      {loading && !data ? <CardSkeletons /> : shown.length === 0
        ? <p className="text-center text-jd-mute py-20">{t("empty")}</p>
        : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{shown.map((c, i) => <CampaignCard key={c.id} c={c} i={i} />)}</div>}
    </>
  );
}
