import {useState} from "react";import {useNavigate} from "react-router-dom";import {createCampaign} from "../api";import {useLang} from "../i18n";
const I="w-full border rounded-xl px-3 py-2 bg-white text-sm outline-none focus:ring-2 ring-jd";
export default ()=>{const {t}=useLang();const nav=useNavigate();const [busy,setBusy]=useState(false);const [res,setRes]=useState(null);
const submit=async e=>{e.preventDefault();setBusy(true);try{const c=await createCampaign(new FormData(e.target));setRes(c)}catch{alert("Error")}setBusy(false)};
if(res)return <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 text-center"><p className={`font-bold ${res.status==="VERIFIED"?"text-jd-ok":"text-jd-wait"}`}>{res.status==="VERIFIED"?t("done"):t("manual")}</p>
<button onClick={()=>nav("/campaigns/"+res.id)} className="mt-5 bg-jd text-white font-bold px-6 py-2 rounded-full">{t("open")}</button></div>;
return <form onSubmit={submit} className="max-w-xl mx-auto bg-white rounded-3xl p-6 space-y-3">
<h1 className="text-xl font-extrabold">{t("create")}</h1>
<input name="title" required placeholder={t("title")} className={I}/>
<select name="category" className={I}>{["medical","emergency","ngo","social"].map(k=><option key={k} value={k}>{t(k)}</option>)}</select>
<textarea name="description" required rows={5} placeholder={t("desc")} className={I}/>
<input name="target" type="number" min="1000" required placeholder={t("target")} className={I}/>
<input name="beneficiary" required placeholder={t("ben")} className={I}/><input name="payment" placeholder={t("pay")} className={I}/>
<label className="block text-xs font-semibold text-jd-mute">{t("cover")}<input name="cover" type="file" accept="image/*" required className={I}/></label>
<label className="block text-xs font-semibold text-jd-mute">{t("files")}<input name="documents" type="file" accept="image/*,.pdf" multiple className={I}/></label>
<button disabled={busy} className="w-full bg-jd hover:bg-jd-deep disabled:opacity-60 text-white font-bold py-3 rounded-xl">{busy?t("checking"):t("submit")}</button></form>};
