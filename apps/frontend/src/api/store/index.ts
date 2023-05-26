import { BASE_URL, fetchData } from "..";
import { authHeaders } from "../helpers";
import { StoreUpdateInformationForm, StoreUpdateSocialForm } from "./types";

export const getStoreByDomain = (domain: string) =>
  fetchData.get(`${BASE_URL}/tenant/store/domain/${domain}`);

export const getInformation = () =>
  fetchData.get(`${BASE_URL}/tenant/store/information`, {
    headers: {
      ...authHeaders(),
    },
  });

export const updateInformation = (form: StoreUpdateInformationForm) =>
  fetchData.put(`${BASE_URL}/tenant/store/information`, form, {
    headers: {
      ...authHeaders(),
    },
  });

export const getSocialInformation = () =>
  fetchData.get(`${BASE_URL}/tenant/store/social`, {
    headers: {
      ...authHeaders(),
    },
  });

export const updateSocialInformation = (form: StoreUpdateSocialForm) =>
  fetchData.put(`${BASE_URL}/tenant/store/social`, form, {
    headers: {
      ...authHeaders(),
    },
  });
