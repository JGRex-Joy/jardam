import {AlertTriangle,ShieldCheck} from "lucide-react";import {useLang} from "../../i18n";
export default ({report})=>{
  const {t}=useLang();
  const r=report||{};
  return <div className="bg-jd-50 rounded-3xl p-6">
    <h3 className="font-bold flex items-center gap-2"><ShieldCheck className="text-jd-ok"/>{t("ai")}</h3>
    <p className="text-3xl font-extrabold text-jd-deep mt-2">{Math.round((r.score||0)*100)}%<span className="text-sm font-semibold text-jd-mute ml-2">{t("score")}</span></p>
    <p className="text-sm text-jd-mute mt-2">{r.summary}</p><p className="text-[11px] text-jd-mute mt-1">{t("model")}: {r.model}</p>
    <ul className="mt-3 space-y-1 text-sm">
      {(r.checks||[]).map(x=><li key={x} className="text-jd-ok">✓ {x}</li>)}
      {(r.red_flags||[]).map(x=><li key={x} className="text-jd-wait flex gap-1"><AlertTriangle size={14} className="mt-0.5 shrink-0"/>{x}</li>)}</ul></div>};
