import {
  IProduct,
  IProductCategory,
} from "../../admin/views/products/context/types";

export interface StoreContext {
  actions: StoreActions;
  state: StoreState;
}

export interface StoreActions {}
export interface StoreState {
  store: IStore;
  categories: Array<IProductCategory>;
  categoriesWithProducts: Array<IProductCategoryWithProducts>;
}

export interface IStore {
  banner_img: string | null;
  category: string;
  country: string;
  currency: string;
  description: string | null;
  domain: string;
  id: string;
  logo_img: string | null;
  name: string;
  team_description: string | null;
  team_img: string | null;
  telephone: string;
  whatsapp: string;
  tenant_id: string;
  social: IStoreSocial;
}

export interface IStoreSocial {
  id: string;
  store_id: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  pinterest: string;
  twitter: string;
  youtube: string;
}

export interface IProductCategoryWithProducts extends IProductCategory {
  products: Array<IProduct>;
}
