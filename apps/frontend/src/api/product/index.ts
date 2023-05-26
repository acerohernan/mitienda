import { BASE_URL, fetchData } from "..";
import { authHeaders } from "../helpers";
import {
  CreateProductCategoryForm,
  CreateProductForm,
  UpdateProductCategoryForm,
  UpdateProductForm,
} from "./types";

export const getAllProducts = (page = 1, limit = 10) =>
  fetchData.get(`${BASE_URL}/product/store?page=${page}&&limit=${limit}`, {
    headers: {
      ...authHeaders(),
    },
  });

export const getProduct = (id: string) =>
  fetchData.get(`${BASE_URL}/product/${id}`);

export const createProduct = (form: CreateProductForm) =>
  fetchData.post(`${BASE_URL}/product`, form, {
    headers: {
      ...authHeaders(),
    },
  });

export const updateProduct = (productId: string, form: UpdateProductForm) =>
  fetchData.patch(`${BASE_URL}/product/${productId}`, form, {
    headers: {
      ...authHeaders(),
    },
  });

export const deleteProduct = (productId: string) =>
  fetchData.delete(`${BASE_URL}/product/${productId}`, {
    headers: {
      ...authHeaders(),
    },
  });

export const getAllCategories = (tokenServer?: string) =>
  fetchData.get(`${BASE_URL}/product/category/store`, {
    headers: tokenServer
      ? {
          authorization: `Bearer ${tokenServer}`,
        }
      : {
          ...authHeaders(),
        },
  });

export const getAllCategoriesFromStore = (
  storeId: string,
  { limit = 4, page = 1, products = 0 } = {}
) =>
  fetchData.get(
    `${BASE_URL}/product/category/store/${storeId}?limit=${limit}&page=${page}&products=${products}`,
    {
      headers: {
        ...authHeaders(),
      },
    }
  );

export const createProductCategory = (form: CreateProductCategoryForm) =>
  fetchData.post(`${BASE_URL}/product/category`, form, {
    headers: {
      ...authHeaders(),
    },
  });

export const updateProductCategory = (
  categoryId: string,
  form: UpdateProductCategoryForm
) =>
  fetchData.patch(`${BASE_URL}/product/category/${categoryId}`, form, {
    headers: {
      ...authHeaders(),
    },
  });

export const deleteProductCategory = (categoryId: string) =>
  fetchData.delete(`${BASE_URL}/product/category/${categoryId}`, {
    headers: {
      ...authHeaders(),
    },
  });
