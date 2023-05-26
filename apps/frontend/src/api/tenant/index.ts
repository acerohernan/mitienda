import { BASE_URL, fetchData } from "..";
import { authHeaders } from "../helpers";
import {
  TenantForgotPasswordForm,
  TenantLoginForm,
  TenantRestorePasswordForm,
  TenantSignupForm,
  TenantUpdateInformationForm,
} from "./types";

export const login = (form: TenantLoginForm) =>
  fetchData.post(`${BASE_URL}/tenant/auth/login`, form);

export const signup = (form: TenantSignupForm) =>
  fetchData.post(`${BASE_URL}/tenant/auth/signup`, form);

export const forgotPassword = (form: TenantForgotPasswordForm) =>
  fetchData.post(`${BASE_URL}/tenant/auth/password/forgot`, form);

export const verifyRestorePasswordCode = (code: string) =>
  fetchData.get(`${BASE_URL}/tenant/auth/password/verify-code/${code}`);

export const restorePassword = (form: TenantRestorePasswordForm) =>
  fetchData.post(`${BASE_URL}/tenant/auth/password/restore`, form);

export const getInformation = () => {
  return fetchData.get(`${BASE_URL}/tenant/information`, {
    headers: {
      ...authHeaders(),
    },
  });
};

export const updateInformation = (data: TenantUpdateInformationForm) =>
  fetchData.put(`${BASE_URL}/tenant/information`, data, {
    headers: {
      ...authHeaders(),
    },
  });

export const uploadImage = (form: FormData) =>
  fetchData.post(`${BASE_URL}/tenant/upload/image`, form, {
    headers: {
      ...authHeaders(),
    },
  });
