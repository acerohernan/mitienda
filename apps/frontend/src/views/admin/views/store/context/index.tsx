import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import { API } from "../../../../../api";
import {
  StoreUpdateInformationForm,
  StoreUpdateSocialForm,
} from "../../../../../api/store/types";
import { getHttpError } from "../../../../../helpers/httpError";
import { useToast } from "../../../../../hooks/useToast";
import { IStoreSocial } from "../../../../store/types";
import { useAdminContext } from "../../../context";
import {
  IAdminStoreActions,
  IAdminStoreContext,
  IAdminStoreState,
  IStore,
} from "./types";

const AdminStoreContext = React.createContext({} as IAdminStoreContext);

const initialState: IAdminStoreState = {
  store: null,
};

export const AdminStoreProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, setState] = React.useState<IAdminStoreState>(initialState);

  const { push } = useRouter();
  const toast = useToast();
  const {
    actions: { updateStoreInformation },
  } = useAdminContext();

  async function getInformation() {
    try {
      const [storeRpta, socialRpta] = await Promise.all([
        API.store.getInformation(),
        API.store.getSocialInformation(),
      ]);
      /* Get the store information */

      const store = storeRpta.data.store;
      const social = socialRpta.data.social;

      setState({ ...state, store: { ...store, social } });
    } catch (err) {
      toast.error(getHttpError(err));
      Cookies.remove("token");
      push("/login");
    }
  }

  async function updateInformation(form: StoreUpdateInformationForm) {
    try {
      await API.store.updateInformation(form);
      const storeUpdated = { ...(state.store as IStore), ...form };
      setState({ ...state, store: storeUpdated });
      updateStoreInformation(storeUpdated);
      toast.success("Información actualizada");
    } catch (err) {
      toast.error(getHttpError(err));
    }
  }

  async function updateSocial(form: StoreUpdateSocialForm) {
    try {
      await API.store.updateSocialInformation(form);
      setState({
        ...state,
        store: {
          ...(state.store as IStore),
          social: { ...state.store?.social, ...(form as IStoreSocial) },
        },
      });
      toast.success("Información actualizada");
    } catch (err) {
      toast.error(getHttpError(err));
    }
  }

  async function uploadImage(img: File): Promise<{ url: string | null }> {
    try {
      const formData = new FormData();
      formData.append("img", img);
      const response = await API.tenant.uploadImage(formData);
      return { url: response.data.url };
    } catch (err) {
      toast.error(getHttpError(err));
      return { url: null };
    }
  }

  const actions: IAdminStoreActions = {
    getInformation,
    updateInformation,
    uploadImage,
    updateSocial,
  };

  return (
    <AdminStoreContext.Provider value={{ actions, state }}>
      {children}
    </AdminStoreContext.Provider>
  );
};

export const useAdminStoreContext = () => React.useContext(AdminStoreContext);
