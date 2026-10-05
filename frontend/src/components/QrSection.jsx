import {useRef,useState} from "react";import {QRCodeCanvas} from "qrcode.react";import {Download,Link2,Check,QrCode} from "lucide-react";import {useLang} from "../i18n";
export default ({id,title})=>{const {t}=useLang();const ref=useRef();const [ok,setOk]=useState(false);const url=`https://jardam.kg/campaigns/${id}`;
const download=()=>{const q=ref.current.querySelector("canvas");const c=document.createElement("canvas");c.width=800;c.height=1100;const x=c.getContext("2d");
x.fillStyle="#fff";x.fillRect(0,0,800,1100);x.fillStyle="#047857";x.fillRect(0,0,800,110);x.fillStyle="#fff";x.textAlign="center";x.font="800 56px Montserrat,sans-serif";x.fillText("Jardam",400,76);
x.drawImage(q,100,160,600,600);x.fillStyle="#111827";x.font="700 30px Montserrat,sans-serif";x.fillText(title.slice(0,42),400,830);x.font="600 28px Montserrat,sans-serif";x.fillText(t("qrScan"),400,890);x.font="24px sans-serif";x.fillStyle="#4B5563";x.fillText(url,400,950);
const a=document.createElement("a");a.download=`jardam-${id}-qr.png`;a.href=c.toDataURL("image/png");a.click()};
const copy=async()=>{try{await navigator.clipboard.writeText(url)}catch{}setOk(true);setTimeout(()=>setOk(false),1800)};
return <section className="rounded-3xl p-6 bg-gradient-to-br from-jd-deep to-jd text-white"><h2 className="font-extrabold text-lg flex items-center gap-2"><QrCode/>{t("qrTitle")}</h2>
<p className="text-sm text-emerald-50 mt-1">{t("qrDesc")}</p>
<div className="flex flex-col sm:flex-row gap-5 items-center mt-4"><div ref={ref} className="bg-white p-3 rounded-2xl shadow-lg"><QRCodeCanvas value={url} size={600} level="H" fgColor="#047857" style={{width:168,height:168}}/></div>
<div className="flex-1 w-full space-y-2"><p className="text-xs break-all text-emerald-100">{url}</p>
<button onClick={download} className="w-full flex items-center justify-center gap-2 bg-white text-jd-deep font-bold py-2.5 rounded-xl hover:bg-jd-50 transition"><Download size={18}/>{t("qrDownload")}</button>
<button onClick={copy} className="w-full flex items-center justify-center gap-2 bg-white/15 font-bold py-2.5 rounded-xl hover:bg-white/25 transition">{ok?<Check size={18}/>:<Link2 size={18}/>}{ok?t("copied"):t("qrCopy")}</button></div></div></section>};
