import { useEffect } from "react";
import { m } from "framer-motion";
import { X } from "lucide-react";
import { useLang } from "../i18n";
import BankReceipt from "./documents/BankReceipt";
import IdCard from "./documents/IdCard";
import MedicalStatement from "./documents/MedicalStatement";
import NgoCertificate from "./documents/NgoCertificate";

const TEMPLATES = { medical: MedicalStatement, id: IdCard, receipt: BankReceipt, certificate: NgoCertificate };
const inferType = (name = "") =>
  /паспорт|удостоверен|passport/i.test(name) ? "id"
  : /выписк|главврач|медицин/i.test(name) ? "medical"
  : /счёт|счет|чек|квитанц/i.test(name) ? "receipt"
  : "certificate";

export default function DocumentViewer({ doc, campaign, onClose }) {
  const { t } = useLang();
  useEffect(() => {
    if (!doc) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [doc, onClose]);
  if (!doc || !campaign) return null;

  const isUpload = doc.url?.startsWith("data:"); // real user upload → show the actual file
  const Template = TEMPLATES[inferType(doc.name)];
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" role="dialog" aria-modal="true" onClick={onClose}>
      <m.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
        className="bg-gray-100 rounded-2xl p-4 w-full max-w-xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm">{doc.name}</h3>
          <button aria-label={t("close")} onClick={onClose}><X /></button>
        </div>
        {isUpload
          ? (doc.url.startsWith("data:application/pdf") ? <iframe title={doc.name} src={doc.url} className="w-full h-[70vh]" /> : <img src={doc.url} alt={doc.name} className="w-full rounded-lg" />)
          : <><Template campaign={campaign} doc={doc} /><p className="mt-3 text-center text-[11px] text-jd-mute">{t("demoNote")}</p></>}
      </m.div>
    </div>
  );
}
