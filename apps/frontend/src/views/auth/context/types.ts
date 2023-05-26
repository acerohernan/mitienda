import {
  TenantForgotPasswordForm,
  TenantLoginForm,
  TenantSignupForm,
} from "../../../api/tenant/types";

export interface IAuthContext {
  state: IAuthContextState;
  actions: IAuthContextActions;
}

export interface IAuthContextState {}

export interface IAuthContextActions {
  login: (form: TenantLoginForm) => Promise<void>;
  signup: (form: TenantSignupForm) => Promise<void>;
  logout: () => void;
  forgotPassword: (form: TenantForgotPasswordForm) => Promise<void>;
}
