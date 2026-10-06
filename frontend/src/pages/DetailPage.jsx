import { useState } from "react";
import { useParams } from "react-router-dom";
import AiReportCard from "../components/detail/AiReportCard";
import BudgetTable from "../components/detail/BudgetTable";
import DocumentList from "../components/detail/DocumentList";
import DocumentViewer from "../components/DocumentViewer";
import DonationCard from "../components/detail/DonationCard";
import ExpenseHistory from "../components/detail/ExpenseHistory";
import QrSection from "../components/QrSection";
import StateCard from "../components/StateCard";
import { Spinner } from "../components/Skeleton";
import VerificationBadge from "../components/VerificationBadge";
import { useCampaign } from "../hooks/useCampaign";
import { useLang } from "../i18n";
import { campaignUrl } from "../utils/appUrl";

export default function DetailPage() {
  const { id } = useParams();
  const { t, pick } = useLang();
  const { campaign: c, loading, error, reload, donate } = useCampaign(id);
  const [openDoc, setOpenDoc] = useState(null);

  if (loading) return <Spinner />;
  if (error) return <StateCard kind={error.status === 404 ? "notFound" : "error"} detail={error.message} onRetry={reload} />;
  if (!c) return <StateCard kind="notFound" />;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-3xl overflow-hidden">
          <img src={c.cover_url} alt="" decoding="async" className="w-full h-72 object-cover bg-jd-50" />
          <div className="p-6">
            <h1 className="text-2xl font-extrabold">{pick(c, "title")}</h1>
            <div className="mt-3 h-7"><VerificationBadge status={c.status} /></div>
            <h2 className="font-bold mt-5 mb-1">{t("story")}</h2>
            <p className="text-jd-mute whitespace-pre-line">{pick(c, "story")}</p>
          </div>
        </div>
        <BudgetTable items={c.budget ?? []} />
        <ExpenseHistory expenses={c.expenses ?? []} raised={c.raised ?? 0} />
        <DocumentList documents={c.documents ?? []} sealed={c.status === "VERIFIED"} onOpen={setOpenDoc} />
        <QrSection id={c.id} title={pick(c, "title")} url={campaignUrl(c.id)} />
      </div>
      <aside className="space-y-6">
        <DonationCard campaign={c} onDonate={donate} />
        <AiReportCard report={c.ai_report} status={c.status} />
      </aside>
      <DocumentViewer doc={openDoc} campaign={c} onClose={() => setOpenDoc(null)} />
    </div>
  );
}
