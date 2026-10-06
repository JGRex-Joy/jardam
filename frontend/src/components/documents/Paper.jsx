import { useLang } from "../../i18n";

/** Paper sheet with a visible "demo specimen" watermark: these are illustrative mockups, not real documents. */
export default function Paper({ children, className = "" }) {
  const { t } = useLang();
  return (
    <div className={`relative overflow-hidden bg-white rounded-lg border border-gray-300 ${className}`}>
      {children}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center -rotate-[24deg] select-none">
        <span className="text-4xl sm:text-5xl font-black tracking-widest text-gray-400/25">{t("demoSpecimen")}</span>
      </div>
    </div>
  );
}
