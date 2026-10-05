import Card from "./Card";import {useLang,som} from "../../i18n";
export default ({items})=>{
  const {t,pick}=useLang();
  const total=items.reduce((sum,b)=>sum+b.amount,0);
  return <Card><h2 className="font-bold mb-3">{t("budget")}</h2>
    <div className="overflow-x-auto"><table className="w-full text-sm">
      <thead className="text-left text-jd-mute"><tr><th className="py-2">{t("item")}</th><th className="text-right">{t("sum")}</th><th className="text-right w-16">%</th></tr></thead>
      <tbody>{items.map(b=><tr key={b.label_ru} className="border-t"><td className="py-2">{pick(b,"label")}</td><td className="text-right">{som(b.amount)}</td><td className="text-right text-jd-mute">{Math.round(b.amount/total*100)}%</td></tr>)}
        <tr className="border-t font-bold text-jd-deep"><td className="py-2">{t("total")}</td><td className="text-right">{som(total)}</td><td/></tr></tbody>
    </table></div></Card>};
