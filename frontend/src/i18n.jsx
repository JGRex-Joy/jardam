import { createContext, useContext, useMemo, useState } from "react";
import ru from "./locales/ru.json";
import kg from "./locales/kg.json";

const DICTS = { ru, kg };
const Ctx = createContext(null);
const readLang = () => { try { return localStorage.lang === "kg" ? "kg" : "ru"; } catch { return "ru"; } };
const moneyFmt = new Intl.NumberFormat("ru-RU");

export const LangProvider = ({ children }) => {
  const [lang, setLangState] = useState(readLang);
  const value = useMemo(() => ({
    lang,
    setLang: (l) => { try { localStorage.lang = l; } catch { /* storage blocked */ } setLangState(l); },
    t: (k) => DICTS[lang][k] ?? k,
    pick: (o, f) => o?.[`${f}_${lang}`] ?? "",
  }), [lang]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};
export const useLang = () => useContext(Ctx);
export const som = (n) => moneyFmt.format(n ?? 0) + " сом";
