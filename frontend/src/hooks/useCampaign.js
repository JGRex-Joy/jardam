import { useCallback } from "react";
import { donate as postDonation, getCampaign } from "../api";
import { useFetch } from "./useFetch";

export const useCampaign = (id) => {
  const { data, loading, error, reload, setData } = useFetch((signal) => getCampaign(id, signal), [id]);
  const donate = useCallback(async (amount) => {
    try { setData(await postDonation(id, amount)); return true; } catch { return false; }
  }, [id, setData]);
  return { campaign: data, loading, error, reload, donate };
};
