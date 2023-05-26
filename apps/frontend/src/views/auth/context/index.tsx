import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { API } from "../../../api";
import {
  TenantForgotPasswordForm,
  TenantLoginForm,
  TenantSignupForm,
} from "../../../api/tenant/types";
import { getHttpCode, getHttpError } from "../../../helpers/httpError";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useToast } from "../../../hooks/useToast";
import { IAuthContext, IAuthContextActions, IAuthContextState } from "./types";

const AuthContext = React.createContext({} as IAuthContext);

const initialState: IAuthContextState = {};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, setState] = React.useState<IAuthContextState>(initialState);

  const { push } = useRouter();
  const toast = useToast();
  const { setItem } = useLocalStorage();

  async function signup(form: TenantSignupForm): Promise<void> {
    try {
      await API.tenant.signup(form);
      toast.success("Successful registration");
      push("/login");
    } catch (err) {
      toast.error(getHttpError(err));
    }
  }

  async function login(form: TenantLoginForm): Promise<void> {
    try {
      const response = await API.tenant.login(form);
      const { token, tenant, store } = response.data;
      Cookies.set("token", token);
      setItem("tenant", JSON.stringify(tenant));
      setItem("store", JSON.stringify(store));
      toast.success("Welcome back!");
      push("/admin");
    } catch (err) {
      const code = getHttpCode(err);
      if (code === 400) {
        toast.error("Invalid credentials");
      } else {
        toast.error(getHttpError(err));
      }
    }
  }

  function logout(): void {
    Cookies.remove("token");
    push("/login");
  }

  async function forgotPassword(form: TenantForgotPasswordForm) {
    try {
      await API.tenant.forgotPassword(form);
    } catch (err) {
      toast.error(getHttpError(err));
    }
  }

  const actions: IAuthContextActions = {
    signup,
    login,
    logout,
    forgotPassword,
  };

  const token = Cookies.get("token");

  React.useEffect(() => {
    if (token) push("/admin");
  }, [token]);

  return (
    <AuthContext.Provider value={{ state, actions }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
