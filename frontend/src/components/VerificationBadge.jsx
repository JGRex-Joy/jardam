import {BadgeCheck} from "lucide-react";import {useLang} from "../i18n";
export default ({status})=>{const {t}=useLang();const ok=status==="VERIFIED";
return <span className={`inline-flex shrink-0 items-center justify-center gap-1.5 h-7 w-48 whitespace-nowrap text-[11px] font-bold text-white rounded-full ${ok?"bg-jd-ok":"bg-jd-wait"}`}>
{ok?<BadgeCheck size={14}/>:<span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute h-full w-full rounded-full bg-white opacity-70"/><span className="relative h-2.5 w-2.5 rounded-full bg-white"/></span>}
{ok?t("verified"):t("pending")}</span>};
