import {useEffect,useRef} from "react";import {Link,useNavigate,useLocation} from "react-router-dom";import {Search,Plus} from "lucide-react";
import Logo from "./Logo";import LanguageToggle from "./LanguageToggle";import {useLang} from "../i18n";
export default ()=>{const {t}=useLang();const nav=useNavigate();const {pathname}=useLocation();const timer=useRef();useEffect(()=>()=>clearTimeout(timer.current),[]);const search=v=>{clearTimeout(timer.current);timer.current=setTimeout(()=>nav("/?q="+encodeURIComponent(v),{replace:pathname==="/"}),300)};
return <header className="sticky top-0 z-30 bg-white border-b border-gray-100"><div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-3">
<Link to="/"><Logo/></Link>
<div className="flex-1 relative hidden sm:block max-w-md mx-auto"><Search size={16} className="absolute left-3 top-3 text-gray-400"/>
<input onChange={e=>search(e.target.value)} placeholder={t("search")} className="w-full pl-9 pr-3 py-2 rounded-full bg-jd-slate text-sm outline-none focus:ring-2 ring-jd"/></div>
<div className="flex-1 sm:hidden"/><LanguageToggle/>
<Link to="/create" className="flex items-center gap-1 bg-jd hover:bg-jd-deep text-white text-sm font-bold px-4 py-2 rounded-full"><Plus size={16}/><span className="hidden sm:inline">{t("create")}</span></Link></div></header>};
