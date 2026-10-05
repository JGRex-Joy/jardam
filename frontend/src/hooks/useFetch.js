import { useCallback, useEffect, useState } from "react";

/** Fetch with cancellation: stale/aborted requests can never overwrite newer state. */
export const useFetch = (fetcher, deps, { keepPrevious = false } = {}) => {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((s) => ({ data: keepPrevious ? s.data : null, loading: true, error: null }));
    fetcher(controller.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (error.name !== "AbortError") setState({ data: null, loading: false, error });
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  const setData = useCallback((data) => setState((s) => ({ ...s, data })), []);
  const reload = useCallback(() => setAttempt((n) => n + 1), []);
  return { ...state, setData, reload };
};
