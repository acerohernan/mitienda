import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { API } from "../../../../../api";
import {
  CreateProductCategoryForm,
  UpdateProductCategoryForm,
} from "../../../../../api/product/types";
import { getHttpError } from "../../../../../helpers/httpError";
import { useToast } from "../../../../../hooks/useToast";
import {
  IAdminProductActions,
  IAdminProductContext,
  IAdminProductState,
  IProductCategory,
} from "./types";

const AdminProductContext = React.createContext({} as IAdminProductContext);

const initialState: IAdminProductState = {
  products: [],
  metadata: {
    page: 1,
    entities_count: 0,
    has_next_page: false,
    has_previous_page: false,
    limit: 1,
    next_page: 2,
    page_count: 0,
  },
  categories: {},
  selectedCategory: {
    id: "",
    img_url: "",
    name: "",
  },
};

export const AdminProductProvider: React.FC<
  React.PropsWithChildren<{ categories: Array<IProductCategory> }>
> = ({ children, categories }) => {
  const [state, setState] = useState<IAdminProductState>(() => {
    let catMap = {};
    categories.forEach((cat) => {
      catMap = { ...catMap, [cat.id]: cat };
    });

    return { ...initialState, categories: catMap };
  });

  const toast = useToast();
  const { push } = useRouter();

  async function getAllProducts() {
    try {
      const response = await API.product.getAllProducts();
      const products = response.data.products;
      const metadata = response.data.meta;
      setState({ ...state, products, metadata });
    } catch (err) {
      toast.error("Ha ocurrido un error, ingresa nuevamente");
      Cookies.remove("token");
      push("/login");
    }
  }

  async function getAllCategories() {
    try {
      const response = await API.product.getAllCategories();
      const categories: Array<IProductCategory> = response.data.categories;
      let catMap = {};
      categories.forEach((cat) => {
        catMap = { ...catMap, [cat.id]: cat };
      });
      setState({ ...state, categories: catMap });
    } catch (err) {
      toast.error(getHttpError(err));
    }
  }

  async function createProductCategory(form: CreateProductCategoryForm) {
    try {
      await API.product.createProductCategory(form);
      setState({
        ...state,
        categories: {
          ...state.categories,
          [form.id]: {
            id: form.id,
            img_url: form.img_url,
            name: form.name,
          },
        },
      });
      toast.success("Categoría creada correctamente");
    } catch (err) {
      toast.error("Ha ocurrido un error al crear la categoría");
    }
  }

  async function updateProductCategory(
    categoryId: string,
    form: UpdateProductCategoryForm
  ) {
    try {
      await API.product.updateProductCategory(categoryId, form);
      setState({
        ...state,
        categories: {
          ...state.categories,
          [categoryId]: {
            id: categoryId,
            img_url: form.img_url,
            name: form.name,
          },
        },
      });
      toast.success("Información actualizada con éxito");
    } catch (err) {
      toast.error("Ha ocurrido un error al editar la información");
    }
  }

  async function deleteProductCategory(categoryId: string) {
    try {
      await API.product.deleteProductCategory(categoryId);
      const {
        [categoryId]: {},
        ...categories
      } = state.categories;
      setState({
        ...state,
        categories,
      });
      toast.success("Recurso eliminado con éxito");
    } catch (err) {
      toast.error("Ha ocurrido un error al eliminar la información");
    }
  }

  async function handleSelectCategory(id: string) {
    const category = state.categories[id];

    if (!category) toast.error("No se puede editar esta categoría");

    setState({ ...state, selectedCategory: category });
  }

  const actions: IAdminProductActions = {
    getAllProducts,
    getAllCategories,
    createProductCategory,
    updateProductCategory,
    deleteProductCategory,
    handleSelectCategory,
  };

  return (
    <AdminProductContext.Provider value={{ actions, state }}>
      {children}
    </AdminProductContext.Provider>
  );
};

export const useAdminProductsContext = () =>
  React.useContext(AdminProductContext);
