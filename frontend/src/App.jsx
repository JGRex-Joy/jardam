import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import { Spinner } from "./components/Skeleton";
import StateCard from "./components/StateCard";
import FeedPage from "./pages/FeedPage";
import LandingPage from "./pages/LandingPage";

const DetailPage = lazy(() => import("./pages/DetailPage"));
const CreatePage = lazy(() => import("./pages/CreatePage"));

// Short, opacity/transform-only transitions: smooth on the GPU, and an exit can never stall navigation for long.
const section = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.18 } };
const page = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.2, ease: "easeOut" } };

/** Routes of the main application (everything except the splash). `location` is passed explicitly so an exiting page keeps its own route. */
function AppShell({ location }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <AnimatePresence mode="wait">
          <m.div key={location.pathname} {...page}>
            <Suspense fallback={<Spinner />}>
              <Routes location={location}>
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/campaigns/:id" element={<DetailPage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="*" element={<StateCard kind="notFound" />} />
              </Routes>
            </Suspense>
          </m.div>
        </AnimatePresence>
      </main>
    </>
  );
}

export default function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/"; // "/" → LandingPage, standalone full-screen view
  useEffect(() => { window.scrollTo?.(0, 0); }, [location.pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>
        <ErrorBoundary resetKey={location.pathname}>
          <AnimatePresence mode="wait">
            <m.div key={isLanding ? "landing" : "app"} {...section}>
              {isLanding ? <LandingPage /> : <AppShell location={location} />}
            </m.div>
          </AnimatePresence>
        </ErrorBoundary>
      </LazyMotion>
    </MotionConfig>
  );
}
