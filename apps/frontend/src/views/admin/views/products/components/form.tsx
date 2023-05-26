import React from "react";
import { IProduct, IProductImage } from "../context/types";

import { nanoid } from "nanoid";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { API } from "../../../../../api";
import Select, { SelectOption } from "../../../../../components/form/select";
import TextInput from "../../../../../components/form/text";
import useTranslation from "../../../../../i18n/useTranslation";
import VariantCard from "../components/variant/card";
import { useAdminProductsContext } from "../context";
import { IProductVariant } from "../context/types";
import ProductImagesForm from "./images";
import ProductVariantModal from "./variant/modal";

interface Props {
  product: IProduct;
  onSave: (product: IProduct) => Promise<void>;
}

const AdminProductForm: React.FC<Props> = ({ product, onSave }) => {
  const { t } = useTranslation();
  const {
    actions: { getAllCategories },
    state: { categories },
  } = useAdminProductsContext();

  const categoriesArr = Object.values(categories);
  const selectedCatOption: SelectOption =
    product.category_id && categories[product.category_id]
      ? {
          value: categories[product.category_id].id,
          component: <>{categories[product.category_id].name}</>,
        }
      : {
          value: "",
          component: <> </>,
        };

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState<Record<string, IProductImage>>(() => {
    let state: Record<string, IProductImage> = {};

    product.images.forEach((img) => {
      state[img.id] = img;
    });

    return state;
  });
  const [variants, setVariants] = useState<Record<string, IProductVariant>>(
    () => {
      let state: Record<string, IProductVariant> = {};

      product.variants.forEach((variant) => {
        const id = nanoid();
        state[id] = { ...variant, id };
      });

      return state;
    }
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProduct>();

  async function onSubmit(data: IProduct) {
    data.variants = Object.values(variants);
    data.stock = Number(data.stock);
    data.images = await uploadImages();

    if (!data.offer_price) data.offer_price = null;

    setLoading(true);
    await onSave(data);
    setLoading(false);
  }

  async function uploadImages(): Promise<Array<IProductImage>> {
    const imagesArr = Object.values(images);

    for (let img of imagesArr) {
      if (img.url.includes("blob:")) {
        try {
          let file = await fetch(img.url).then((r) => r.blob());
          const formData = new FormData();
          formData.append("img", file);
          const response = await API.tenant.uploadImage(formData);
          const url = response.data.url;

          if (!url) throw new Error();

          img.url = url;
        } catch (err) {
          const {
            [img.id]: {},
            ...filtered
          } = images;
          setImages(filtered);
          toast.error(`The img cannot be uploaded`);
        }
      }
    }

    return imagesArr;
  }

  function handleAddVariant(variant: IProductVariant) {
    setVariants({ ...variants, [variant.id]: variant });
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <div className={openModal ? "hide-page" : ""}>
      <div>
        <span className="font-medium text-2xl dark:text-white">
          {t("Products")}
        </span>
        <div className="flex items-center gap-5 mt-3">
          <Link
            href="/admin"
            className="text-sm dark:text-white hover:underline"
          >
            {t("Administrator")}
          </Link>
          <div className="w-1 h-1 bg-slate-400 dark:bg-slate-50 rounded-full" />
          <Link
            href="/admin/products"
            className="hover:underline text-sm dark:text-white"
          >
            {t("Products")}
          </Link>
          <div className="w-1 h-1 bg-slate-400 dark:bg-slate-50 rounded-full" />
          <span className="text-sm text-slate-400">
            {product.name || "Create"}
          </span>
        </div>
      </div>
      <form
        className="card w-full mt-4 lg:mt-14 p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="label block">Foto de su producto</label>
        <div className="flex mt-2">
          <ProductImagesForm images={images} setImages={setImages} />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <TextInput
            full
            label="Name"
            inputProps={{
              placeholder: "Test Product",
              ...register("name", {
                required: t("This field is required"),
                value: product.name,
              }),
            }}
            error={errors.name?.message}
          />
          <TextInput
            full
            label="SKU"
            optional
            inputProps={{
              placeholder: "010101",
              ...register("sku", {
                value: product.sku,
              }),
            }}
            error={errors.sku?.message}
          />
          <div className="lg:col-span-2">
            <TextInput
              full
              label="Description"
              textarea
              optional
              inputProps={{
                rows: 5,
                ...register("description", {
                  value: product.description,
                }),
              }}
              error={errors.description?.message}
            />
          </div>
          <TextInput
            full
            label="Full Price"
            inputProps={{
              placeholder: "8.00",
              ...register("price", {
                required: t("This field is required"),
                value: product.price,
              }),
            }}
            error={errors.price?.message}
          />
          <TextInput
            full
            label="Offer Price"
            inputProps={{
              placeholder: "7.00",
              ...register("offer_price", {
                value: product.offer_price,
              }),
            }}
            error={errors.offer_price?.message}
          />
          <TextInput
            full
            label="Stock"
            inputProps={{
              placeholder: "12",
              ...register("stock", {
                required: t("This field is required"),
                min: {
                  value: 1,
                  message: "El stock del producto no puede ser menor a 1",
                },
                value: product.stock,
              }),
            }}
            error={errors.stock?.message}
          />

          <div>
            <label className="block mb-2 label">Category</label>
            <Select
              onChange={(opt) => {
                setValue("category_id", opt.value);
              }}
              items={categoriesArr.map((cat) => ({
                value: cat.id,
                component: <>{cat.name}</>,
              }))}
              selectedOption={selectedCatOption}
              className="input p-3 h-[46px] w-full"
              optionsContainerClassname="w-full"
            />
          </div>

          <div className="lg:col-span-2 mt-4">
            <span className="label block mb-2">Variantes</span>
            <div className="grid gap-6">
              {Object.values(variants).map((variant, i) => (
                <VariantCard
                  variant={variant}
                  handleUpdate={handleAddVariant}
                  key={i}
                  handleOpen={() => setOpenModal(true)}
                />
              ))}
            </div>
            <button
              className="text-sm font-medium hover:underline text-purple-800 dark:text-purple-400 mt-2"
              type="button"
              onClick={() => setOpenModal(true)}
            >
              + Agregar variante
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="button text-sm" type="submit">
            {product.id ? "Guardar cambios" : "Añadir producto"}
          </button>
        </div>
      </form>
      <ProductVariantModal
        open={openModal}
        handleClose={handleCloseModal}
        onSave={handleAddVariant}
        variant={{
          id: "",
          mandatory: true,
          name: "",
          options_to_choose: 1,
          options: [],
        }}
      />
    </div>
  );
};

export default AdminProductForm;
