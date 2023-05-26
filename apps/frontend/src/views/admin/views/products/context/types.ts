import {
  CreateProductCategoryForm,
  UpdateProductCategoryForm,
} from "../../../../../api/product/types";

export interface IAdminProductContext {
  state: IAdminProductState;
  actions: IAdminProductActions;
}
export interface IAdminProductState {
  products: Array<IProduct>;
  metadata: {
    page: number;
    next_page: number;
    page_count: number;
    limit: number;
    has_next_page: boolean;
    has_previous_page: boolean;
    entities_count: number;
  };
  categories: Record<string, IProductCategory>;
  selectedCategory: IProductCategory;
}
export interface IAdminProductActions {
  getAllProducts: () => Promise<void>;
  getAllCategories: () => Promise<void>;
  createProductCategory: (form: CreateProductCategoryForm) => Promise<void>;
  updateProductCategory: (
    id: string,
    form: UpdateProductCategoryForm
  ) => Promise<void>;
  deleteProductCategory: (id: string) => Promise<void>;
  handleSelectCategory: (categoryId: string) => void;
}

export interface IProduct {
  id: string;
  category_id: string | null;
  name: string;
  sku: string | null;
  description: string | null;
  price: string;
  offer_price: string | null;
  stock: number;
  variants: Array<IProductVariant>;
  images: Array<IProductImage>;
}

export interface IProductImage {
  id: string;
  url: string;
  featured: boolean;
}

export interface IProductVariant {
  id: string;
  name: string;
  mandatory: boolean;
  options_to_choose: number;
  options: Array<IVarianOption>;
}

export interface IVarianOption {
  id: string;
  name: string;
  price: string;
}

export interface IProductCategory {
  id: string;
  name: string;
  img_url: string;
}
