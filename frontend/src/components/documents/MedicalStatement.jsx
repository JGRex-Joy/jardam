import { useLang, som } from "../../i18n";
import Paper from "./Paper";
import Seal from "./Seal";
import Signature from "./Signature";
import { docDate, docNumber, maskName } from "./helpers";

export default function MedicalStatement({ campaign: c }) {
  const { t } = useLang();
  const rows = [
    [t("docPatient"), maskName(c.beneficiary)], [t("docBirth"), "••.••.2019"],
    [t("docDiagnosis"), t("docDiagnosisText")], [t("docCost"), som(c.budget?.[0]?.amount ?? c.target)],
  ];
  return (
    <Paper className="p-5 text-[11px] text-gray-800">
      <div className="text-center leading-tight">
        <p className="font-bold uppercase text-[9px]">Кыргыз Республикасынын Саламаттык сактоо министрлиги<br />Министерство здравоохранения Кыргызской Республики</p>
        <p className="mt-1.5 font-extrabold text-xs text-blue-900">Бишкек №4 клиникалык оорукана<br />Бишкекская клиническая больница №4</p>
        <hr className="my-2 border-blue-900" />
        <h3 className="font-bold text-sm">{t("docMedTitle")} № {docNumber(c.id, "МД")}</h3>
      </div>
      <table className="w-full mt-3 border border-gray-400"><tbody>
        {rows.map(([k, v]) => (
          <tr key={k} className="border-b border-gray-300 last:border-0">
            <th className="w-2/5 text-left bg-gray-50 p-2 font-semibold border-r border-gray-300 align-top">{k}</th><td className="p-2">{v}</td>
          </tr>
        ))}
      </tbody></table>
      <div className="mt-5 flex items-end justify-between gap-2">
        <div><p className="text-gray-500">{t("docChief")}</p><Signature /></div>
        <div className="text-center"><p className="text-gray-500">{t("docDate")}</p><p className="font-semibold">{docDate(c)}</p></div>
        <Seal top="Бишкекская клиническая больница №4" center="№ 4" bottom="★ БИШКЕК ★" />
      </div>
    </Paper>
  );
}
