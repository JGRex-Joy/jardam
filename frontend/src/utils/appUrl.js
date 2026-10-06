// Public frontend origin: explicit env var wins, otherwise whatever domain is serving the app.
export const appBaseUrl = () => (import.meta.env.VITE_APP_URL || window.location.origin).replace(/\/+$/, "");
export const campaignUrl = (id) => `${appBaseUrl()}/campaigns/${id}`;
