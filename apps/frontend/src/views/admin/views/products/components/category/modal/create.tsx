import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { API } from "../../../../../../../api";
import { CreateProductCategoryForm } from "../../../../../../../api/product/types";
import ImageInput from "../../../../../../../components/form/image";
import TextInput from "../../../../../../../components/form/text";
import { useToast } from "../../../../../../../hooks/useToast";
import { useAdminProductsContext } from "../../../context";

interface Props {
  handleClose: () => void;
}

const AdminProductCategoryCreateModal: React.FC<Props> = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<CreateProductCategoryForm>();
  const {
    actions: { createProductCategory },
  } = useAdminProductsContext();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();

  async function onSubmit(form: CreateProductCategoryForm) {
    setLoading(true);

    if (!file) {
      setError("img_url", { message: "The field is required" });
      setLoading(false);
      return;
    }

    if (file) {
      const formData = new FormData();
      formData.append("img", file);
      const response = await API.tenant.uploadImage(formData);
      const url = response.data.url;

      if (url) form.img_url = url;
    }

    form.id = uuid();

    await createProductCategory(form);
    handleClose();
    setLoading(false);
  }

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 w-full h-screen bg-black/50 dark:bg-gray-100/20 z-30">
      <div className="absolute overflow-y-auto top-0 bottom-0 left-0 right-0 m-auto card max-w-md h-[660px] bg-white p-6 sm:p-8 scrollbar grid grid-rows-[1fr_60px]">
        <div>
          <TextInput
            label="Nombre de la Categoría"
            full
            error={errors.name?.message}
            inputProps={{
              ...register("name", {
                required: "The field is required",
                minLength: {
                  message: "The name must have a 6 characters minimum",
                  value: 6,
                },
              }),
            }}
          />
          <div>
            <span className="text-sm label block mt-4 mb-2">Imagen *</span>
            <ImageInput
              id="category_img"
              className="w-full h-[350px]"
              rounded="rounded-lg"
              onChange={(file) => {
                setFile(file);
                clearErrors("img_url");
              }}
            />
            <span className="input-error-message mt-2 block">
              {errors.img_url?.message}
            </span>
          </div>
        </div>
        <div className="flex gap-4 pt-6">
          <button
            className="text-sm button-outline w-full"
            type="button"
            onClick={handleClose}
          >
            Volver
          </button>
          <button
            className="text-sm button w-full"
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCategoryCreateModal;
