import { AlertTriangle, SearchX } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n";

export default ({ kind = "error", detail, onRetry }) => {
  const { t } = useLang();
  const Icon = kind === "notFound" ? SearchX : AlertTriangle;
  return (
    <div role="alert" className="max-w-md mx-auto bg-white rounded-3xl p-8 text-center">
      <Icon className="mx-auto text-jd-wait" size={36} />
      <h2 className="font-bold mt-3">{t(kind === "notFound" ? "notFound" : "errorTitle")}</h2>
      {detail && <p className="text-xs text-jd-mute mt-2 break-words">{detail}</p>}
      <div className="flex gap-2 justify-center mt-5">
        {onRetry && <button onClick={onRetry} className="bg-jd hover:bg-jd-deep text-white font-bold px-5 py-2 rounded-full">{t("retry")}</button>}
        <Link to="/" className="bg-jd-50 text-jd-deep font-bold px-5 py-2 rounded-full">{t("home")}</Link>
      </div>
    </div>
  );
};
