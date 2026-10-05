import {useState} from "react";import Card from "./Card";import {Progress} from "../Motion";import {useLang,som} from "../../i18n";
export default ({campaign:c,onDonate})=>{
  const {t}=useLang();
  const [amount,setAmount]=useState(1000);const [thanks,setThanks]=useState(false);
  const submit=async()=>setThanks(await onDonate(+amount));
  return <Card className="lg:sticky lg:top-20"><b className="text-2xl text-jd-deep">{som(c.raised)}</b>
    <p className="text-sm text-jd-mute">{t("goal")} {som(c.target)} · {c.donors} {t("donors")} · {c.days_left} {t("days")}</p>
    <div className="my-3"><Progress pct={Math.min(100,Math.round(c.raised/c.target*100))} h="h-2.5"/></div>
    <div className="flex gap-2"><input type="number" min="1" value={amount} onChange={e=>setAmount(e.target.value)} className="w-28 border rounded-xl px-3 py-2 text-sm" aria-label={t("amount")}/>
      <button onClick={submit} className="flex-1 bg-jd hover:bg-jd-deep transition text-white font-bold rounded-xl active:scale-95">{t("support")}</button></div>
    {thanks&&<p className="text-sm text-jd-ok mt-2">{t("thanks")}</p>}
    <p className="text-xs text-jd-mute mt-3">{c.beneficiary} · {c.payment}</p></Card>};
