import {X} from "lucide-react";
export default ({doc,onClose})=>doc&&<div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
  <div className="bg-white rounded-2xl p-3 max-w-lg w-full max-h-[90vh] overflow-auto" onClick={e=>e.stopPropagation()}>
    <button className="ml-auto block" onClick={onClose}><X/></button>
    {doc.url.startsWith("data:application/pdf")?<iframe src={doc.url} className="w-full h-[70vh]"/>:<img src={doc.url} className="w-full"/>}</div></div>;
