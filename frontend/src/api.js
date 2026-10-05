const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const parse = async (res) => {
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
};

export const getCampaigns = (q, signal) => fetch(`${BASE}/api/campaigns?q=${encodeURIComponent(q || "")}`, { signal }).then(parse);
export const getCampaign = (id, signal) => fetch(`${BASE}/api/campaigns/${id}`, { signal }).then(parse);
export const donate = (id, amount) => fetch(`${BASE}/api/campaigns/${id}/donate`, {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ amount }),
}).then(parse);
export const createCampaign = (formData) => fetch(`${BASE}/api/campaigns`, { method: "POST", body: formData }).then(parse);
