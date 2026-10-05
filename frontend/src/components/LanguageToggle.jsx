import {useLang} from "../i18n";
export default ()=>{const {lang,setLang}=useLang();return <div className="flex rounded-full bg-jd-50 p-0.5 text-xs font-bold">
{["ru","kg"].map(l=><button key={l} onClick={()=>setLang(l)} className={`px-3 py-1 rounded-full ${lang===l?"bg-jd text-white":"text-jd-mute"}`}>{l.toUpperCase()}</button>)}</div>};
