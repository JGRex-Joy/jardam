import Card from "./Card";import {Progress} from "../Motion";import {useLang,som} from "../../i18n";
export default ({expenses,raised})=>{
  const {t,pick}=useLang();
  const spent=expenses.reduce((sum,e)=>sum+e.amount,0);
  return <Card><h2 className="font-bold mb-1">{t("expenses")}</h2>
    <p className="text-xs text-jd-mute mb-3">{t("spentOf")}: {som(spent)} / {som(raised)}</p>
    <Progress pct={raised?Math.round(spent/raised*100):0}/>
    {expenses.length===0?<p className="text-sm text-jd-mute mt-4">{t("noExp")}</p>
      :<ul className="mt-4 divide-y text-sm">{expenses.map(e=><li key={e.receipt} className="py-2 flex justify-between gap-3">
        <span><b>{pick(e,"label")}</b><br/><span className="text-xs text-jd-mute">{e.date} · {e.receipt}</span></span>
        <b className="text-jd-deep whitespace-nowrap">{som(e.amount)}</b></li>)}</ul>}</Card>};
