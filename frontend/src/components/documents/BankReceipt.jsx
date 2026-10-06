import { CheckCircle2 } from "lucide-react";
import { useLang, som } from "../../i18n";
import Paper from "./Paper";
import Rows from "./Rows";
import { bankOf, docDate } from "./helpers";

export default function BankReceipt({ campaign: c }) {
  const { t } = useLang();
  const bank = bankOf(c.payment);
  const e = c.expenses?.[0];
  const rows = [
    [t("docTxId"), `T${7300000000 + c.id * 7919}`], [t("docDateTime"), `${docDate(c)} 14:32:07`],
    [t("docRecipient"), c.beneficiary], [t("docReceiptNo"), e?.receipt ?? `RCP-${c.id}`],
  ];
  return (
    <Paper className="max-w-xs mx-auto text-xs text-gray-800">
      <div className="flex items-center justify-between px-4 py-3 text-white" style={{ background: bank.color }}>
        <b className="text-base">{bank.name}</b><span className="text-[11px]">{t("docReceiptTitle")}</span>
      </div>
      <div className="px-5 pt-5 text-center">
        <CheckCircle2 className="mx-auto" size={36} color={bank.color} />
        <p className="mt-1 text-gray-500">{t("docSuccess")}</p>
        <p className="mt-1 text-2xl font-extrabold">{som(e?.amount ?? c.budget?.[0]?.amount ?? c.target)}</p>
      </div>
      <div className="px-5 pb-5"><Rows rows={rows} dashed />
        <div aria-hidden className="mt-4 h-8 opacity-70" style={{ backgroundImage: "repeating-linear-gradient(90deg,#111 0 2px,transparent 2px 4px,#111 4px 5px,transparent 5px 8px)" }} />
      </div>
    </Paper>
  );
}
