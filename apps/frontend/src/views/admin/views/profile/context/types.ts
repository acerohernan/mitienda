import { TenantUpdateInformationForm } from "../../../../../api/tenant/types";

export interface IPorfileContext {
  state: IProfileState;
  actions: IProfileActions;
}

export interface IProfileState {
  tenant: ITenant | null;
}

export interface IProfileActions {
  getInformation: () => void;
  updateInformation: (form: TenantUpdateInformationForm) => Promise<void>;
  uploadImage: (img: File) => Promise<{ url: string | null }>;
}

export interface ITenant {
  id: string;
  store_id: string;
  status: number;
  expiration_date: Date;
  email: string;
  phone: string;
  name: string | null;
  surname: string | null;
  country: string;
  profile_img: string | null;
}
