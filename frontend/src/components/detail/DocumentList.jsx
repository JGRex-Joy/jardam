import {FileText,Stamp} from "lucide-react";import Card from "./Card";import {useLang} from "../../i18n";
export default ({documents,sealed,onOpen})=>{
  const {t}=useLang();
  return <Card><h2 className="font-bold mb-3">{t("docs")}</h2><div className="grid sm:grid-cols-2 gap-3">
    {documents.map(d=><button key={d.id} onClick={()=>onOpen(d)} className="flex items-center gap-2 p-3 rounded-xl bg-jd-50 hover:bg-emerald-100 transition text-left text-sm font-semibold">
      <FileText size={18} className="text-jd-deep shrink-0"/><span className="flex-1">{d.name}</span>
      {sealed&&<span className="flex items-center gap-1 text-[10px] text-jd-ok"><Stamp size={14}/>{t("seal")}</span>}</button>)}</div></Card>};
