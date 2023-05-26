export interface TenantLoginForm {
  email: string;
  password: string;
}

export interface TenantSignupForm {
  email: string;
  password: string;
  phone: string;
  country_code: string;
}

export interface TenantForgotPasswordForm {
  email: string;
}

export interface TenantRestorePasswordForm {
  code: string;
  password: string;
  re_password: string;
}

export interface TenantUpdateInformationForm {
  name: string;
  surname: string;
  phone: string;
  profile_img: string;
}
