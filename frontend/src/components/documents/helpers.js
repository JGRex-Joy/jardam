const SKIP = /^(мама|опекун|ребёнка)$/i;
export const maskName = (n = "") =>
  n.split(/[\s(,:)]+/).filter((w) => w && !SKIP.test(w)).slice(0, 2).map((w) => w[0] + "•••").join(" ") || "•••";
export const docNumber = (id, prefix) => `${prefix}-${String(2400 + id * 37).padStart(5, "0")}`;
export const docDate = (c) => c.expenses?.[0]?.date ?? "2026-09-12";
export const bankOf = (pay = "") =>
  /mbank/i.test(pay) ? { name: "MBank", color: "#00A859" }
  : /элсом|elsom/i.test(pay) ? { name: "Elsom", color: "#F28C28" }
  : { name: "Demir Bank", color: "#0057B8" };
