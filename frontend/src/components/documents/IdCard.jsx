import { User } from "lucide-react";
import { useLang } from "../../i18n";
import Paper from "./Paper";
import { maskName } from "./helpers";

export default function IdCard({ campaign: c }) {
  const { t } = useLang();
  const fields = [
    [t("docFullName"), maskName(c.beneficiary)], [t("docBirth"), "••.••.19••"],
    [t("docPin"), `2${String(c.id).padStart(2, "0")}•••••••••`], [t("docValid"), "••.••.2031"],
  ];
  return (
    <Paper className="aspect-[1.586/1] p-4 bg-gradient-to-br from-sky-50 via-white to-emerald-50 text-[10px]">
      <div aria-hidden className="absolute inset-0 -rotate-12 scale-150 grid grid-cols-4 gap-x-6 gap-y-3 opacity-[.07] font-black select-none">
        {Array.from({ length: 48 }, (_, i) => <span key={i}>KYRGYZ REPUBLIC</span>)}
      </div>
      <div className="relative">
        <p className="text-center font-bold text-[9px] uppercase">Кыргыз Республикасы · Кыргызская Республика</p>
        <p className="text-center font-extrabold text-xs text-sky-900">{t("docIdTitle")}</p>
        <div className="mt-3 flex gap-4">
          <div className="h-24 w-20 shrink-0 rounded bg-gray-200 flex items-end justify-center overflow-hidden"><User size={64} className="text-gray-400" /></div>
          <dl className="space-y-1.5">{fields.map(([k, v]) => <div key={k}><dt className="text-gray-500 leading-none">{k}</dt><dd className="font-bold text-xs">{v}</dd></div>)}</dl>
        </div>
        <p className="mt-2 text-gray-500">{t("docIdAnon")}</p>
        <div aria-hidden className="absolute right-0 bottom-0 h-12 w-12 rounded-full opacity-70 bg-[conic-gradient(from_0deg,#a7f3d0,#bae6fd,#fde68a,#a7f3d0)]" />
      </div>
    </Paper>
  );
}
