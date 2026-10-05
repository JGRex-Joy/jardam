import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import StateCard from "./components/StateCard";
import { Spinner } from "./components/Skeleton";
import FeedPage from "./pages/FeedPage";

const DetailPage = lazy(() => import("./pages/DetailPage"));
const CreatePage = lazy(() => import("./pages/CreatePage"));

export default function App() {
  const { pathname } = useLocation();
  return (
    <LazyMotion features={domAnimation}>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <ErrorBoundary resetKey={pathname}>
          <Suspense fallback={<Spinner />}>
            {/* Opacity-only CSS entrance: can never leave the page stuck invisible. */}
            <div key={pathname} className="animate-fade-in">
              <Routes>
                <Route path="/" element={<FeedPage />} />
                <Route path="/campaign/:id" element={<DetailPage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="*" element={<StateCard kind="notFound" />} />
              </Routes>
            </div>
          </Suspense>
        </ErrorBoundary>
      </main>
    </LazyMotion>
  );
}
