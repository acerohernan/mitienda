import { IStore } from "../../store/types";
import { ITenant } from "../views/profile/context/types";

export interface IAdminContext {
  state: IAdminState;
  actions: IAdminActions;
}
export interface IAdminState {
  tenant: ITenant | null;
  store: IStore | null;
}
export interface IAdminActions {
  updateTenantInformation: (tenant: ITenant) => void;
  updateStoreInformation: (store: IStore) => void;
}
