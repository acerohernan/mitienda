import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { IStore } from "../../store/types";
import { ITenant } from "../views/profile/context/types";
import { IAdminActions, IAdminContext, IAdminState } from "./types";

const AdminContext = React.createContext({} as IAdminContext);

const initialState: IAdminState = {
  store: null,
  tenant: null,
};

export const AdminProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, setState] = React.useState<IAdminState>(initialState);
  const { push } = useRouter();
  const { getItem, removeItem, setItem } = useLocalStorage();

  const token = Cookies.get("token");
  const tenant = getItem("tenant");
  const store = getItem("store");

  React.useEffect(() => {
    if (token && tenant && store) {
      setState({
        ...state,
        tenant: JSON.parse(tenant),
        store: JSON.parse(store),
      });
      return;
    }

    Cookies.remove("token");
    removeItem("tenant");
    removeItem("store");
    push("/login");
  }, []);

  function updateTenantInformation(tenant: ITenant) {
    setState({ ...state, tenant });
    setItem("tenant", JSON.stringify(tenant));
  }

  function updateStoreInformation(store: IStore) {
    setState({ ...state, store });
    setItem("store", JSON.stringify(store));
  }
  const actions: IAdminActions = {
    updateTenantInformation,
    updateStoreInformation,
  };

  return (
    <AdminContext.Provider value={{ actions, state }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => React.useContext(AdminContext);
