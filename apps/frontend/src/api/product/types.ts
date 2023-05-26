export interface CreateProductForm {
  id: string;
  category_id: string | null;
  name: string;
  sku: string | null;
  description: string | null;
  price: string;
  offer_price: string | null;
  stock: number;
  variants: Array<ProductVariantDTO>;
}

export interface ProductVariantDTO {
  name: string;
  mandatory: boolean;
  options_to_choose: number;
  options: Array<VarianOptionDTO>;
}

export interface VarianOptionDTO {
  name: string;
  price: string;
}

export interface UpdateProductForm
  extends Partial<Omit<CreateProductForm, "id">> {}

export interface CreateProductCategoryForm {
  id: string;
  name: string;
  img_url: string;
}

export interface UpdateProductCategoryForm
  extends Omit<CreateProductCategoryForm, "id"> {}
