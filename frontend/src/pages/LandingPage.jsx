import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LanguageToggle from "../components/LanguageToggle";
import Logo from "../components/Logo";
import { useLang } from "../i18n";

const GLOW = "bg-[radial-gradient(circle,rgba(16,185,129,.22),transparent_70%)]";
const WORD_STEP = 0.08;

// Entrance with a per-element delay; the exit has its own short transition so the delay never slows leaving.
const enter = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
});

export default function LandingPage() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const words = t("heroTitle").split(" ");
  const subtitleAt = 0.45 + words.length * WORD_STEP + 0.15;

  return (
    <div className="relative min-h-svh overflow-hidden bg-gradient-to-b from-jd-50 via-white to-jd-slate">
      {/* soft gradients drifting via transform only (no blur filters) */}
      <div aria-hidden className={`absolute -top-24 -left-24 h-80 w-80 rounded-full animate-float ${GLOW}`} />
      <div aria-hidden className={`absolute -bottom-28 -right-20 h-96 w-96 rounded-full animate-float ${GLOW}`} style={{ animationDelay: "-3s" }} />

      <div className="relative z-10 flex min-h-svh flex-col">
        {/* 1 · top bar */}
        <m.header initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.6 } }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }} className="flex items-center justify-between px-5 py-4 sm:px-8">
          <Logo /><LanguageToggle />
        </m.header>

        <main className="flex flex-1 flex-col items-center justify-center px-6 pb-16 text-center">
          {/* 2 · staggered title reveal */}
          <h1 aria-label={t("heroTitle")} className="max-w-3xl text-4xl font-extrabold leading-tight text-jd-ink sm:text-6xl">
            {words.map((w, i) => (
              <m.span key={`${lang}-${i}`} aria-hidden className="mr-[.25em] inline-block" {...enter(0.45 + i * WORD_STEP)}>{w}</m.span>
            ))}
          </h1>

          {/* 3 · mission subtitle */}
          <m.p className="mt-5 max-w-xl text-base text-jd-mute sm:text-lg" {...enter(subtitleAt)}>{t("landingSub")}</m.p>

          {/* 4 · CTA with pulsing glow (scale + opacity only) */}
          <m.div className="relative mt-10 inline-flex" {...enter(subtitleAt + 0.3)}>
            <span aria-hidden className="absolute inset-0 rounded-full bg-jd animate-cta-glow" />
            <m.button onClick={() => navigate("/feed")} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center gap-2 rounded-full bg-jd px-8 py-4 font-bold text-white shadow-lg shadow-emerald-500/30 transition-colors hover:bg-jd-deep">
              {t("heroCta")}<ArrowRight size={20} />
            </m.button>
          </m.div>
        </main>
      </div>
    </div>
  );
}
