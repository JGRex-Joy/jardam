import { useLang } from "../../i18n";
import Paper from "./Paper";
import Rows from "./Rows";
import Seal from "./Seal";
import Signature from "./Signature";
import { docDate, docNumber } from "./helpers";

export default function NgoCertificate({ campaign: c, doc }) {
  const { t } = useLang();
  const rows = [[t("docName"), doc.name], [t("docOrg"), c.beneficiary], [t("docRegNo"), docNumber(c.id, "ОФ")], [t("docDate"), docDate(c)]];
  return (
    <Paper className="p-3">
      <div className="border-4 border-double border-emerald-800/60 p-5 text-[11px] text-gray-800">
        <p className="text-center text-[10px] font-bold uppercase tracking-wide">Кыргыз Республикасы · Кыргызская Республика</p>
        <h3 className="mt-2 text-center text-base font-extrabold text-emerald-900">{t("docCertTitle")}</h3>
        <Rows rows={rows} />
        <p className="mt-4 text-center italic text-gray-500">{t("docCertified")}</p>
        <div className="mt-3 flex items-center justify-between">
          <Signature color="#065f46" />
          <Seal color="#047857" top={c.beneficiary} center="ОФ" bottom="★ KG ★" />
        </div>
      </div>
    </Paper>
  );
}
