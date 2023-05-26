import { XMarkIcon } from "@heroicons/react/24/solid";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Checkbox from "../../../../../../components/form/checkbox";
import Switch from "../../../../../../components/form/switch";
import TextInput from "../../../../../../components/form/text";
import useTranslation from "../../../../../../i18n/useTranslation";
import { IProductVariant } from "../../context/types";
import OptionForm, { OptionFormValues } from "../option/form";
import OptionItem from "../option/item";

interface Props {
  open: boolean;
  handleClose: () => void;
  onSave: (variant: IProductVariant) => void;
  variant: IProductVariant;
}

const ProductVariantModal: React.FC<Props> = ({
  open,
  handleClose,
  onSave,
  variant,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IProductVariant>();
  const { t } = useTranslation();

  const [options, setOptions] = useState<Record<string, OptionFormValues>>(
    () => {
      let options: Record<string, OptionFormValues> = {};

      variant.options.forEach((opt) => {
        const id = nanoid();
        options[id] = { ...opt, id };
      });

      return options;
    }
  );

  const mandatory_value = watch("mandatory");
  const options_to_choose_value = watch("options_to_choose");

  function onSubmit(data: IProductVariant) {
    if (data.options_to_choose < 1) data.options_to_choose = 1;
    data.options = Object.values(options);

    if (!data.id) {
      data.id = nanoid();
      resetFieldsFromInitialValues();
    }

    onSave(data);
    setOptions({});
    handleClose();
  }

  function resetFieldsFromInitialValues() {
    setValue("id", variant.id);
    setValue("name", variant.name);
    setValue("mandatory", variant.mandatory);
    setValue("options_to_choose", variant.options_to_choose);
  }

  function handleSaveOption(data: OptionFormValues) {
    const id = nanoid();
    setOptions({ ...options, [id]: { ...data, id } });
  }

  function handleUpdateOption(id: string) {
    return (form: OptionFormValues) => {
      setOptions({
        ...options,
        [id]: form,
      });
    };
  }

  useEffect(() => {
    setValue("id", variant.id);
    setValue("mandatory", variant.mandatory);
    setValue("options_to_choose", variant.options_to_choose);
  }, []);

  if (!open) return <></>;

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 w-full h-screen bg-black/50 dark:bg-gray-100/20 z-30">
      <div className="absolute overflow-y-auto top-0 bottom-0 left-0 right-0 m-auto lg:my-10 card max-w-xl bg-white p-6 sm:p-8 scrollbar grid grid-rows-[1fr_60px]">
        <div className="flex flex-col gap-6">
          <div>
            <label className="label block mb-2">Nombre de la variante *</label>
            <div className="grid grid-cols-[1fr_50px] gap-4 items-center">
              <TextInput
                full
                inputProps={{
                  placeholder: "Color",
                  ...register("name", {
                    required: t("This field is required"),
                    value: variant.name,
                  }),
                }}
              />
              <button
                className="input p-3 flex justify-center"
                onClick={handleClose}
                type="button"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            {errors.name ? (
              <span className="block input-error-message mt-2">
                {errors.name.message}
              </span>
            ) : null}
            <span className="font-light text-sm block mt-2">
              Recomendamos utilizar solo 1 palabra. Ej.: Color, Talla, etc.
            </span>
          </div>

          <div>
            <div className="flex items-center">
              <Switch
                className="z-10"
                checked={mandatory_value}
                onChange={() =>
                  setValue("mandatory", !Boolean(mandatory_value))
                }
              />
              <span className="label block ml-2">Obligatorio</span>
            </div>
            <span className="font-light text-sm block mt-2">
              Al activarlo, el usuario deberá indicar su elección para
              continuar.
            </span>
          </div>
          <div>
            <span className="label block">¿Cuantas opciones podrá elegir?</span>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                className="text-sm flex items-center"
                onClick={() => setValue("options_to_choose", 1)}
                type="button"
              >
                <Checkbox checked={options_to_choose_value === 1} />
                <span className="block ml-2">Una</span>
              </button>
              <button
                className="text-sm flex items-center "
                onClick={() => setValue("options_to_choose", 2)}
                type="button"
              >
                <div className="w-10">
                  <Checkbox checked={options_to_choose_value !== 1} />
                </div>
                <span className="block ml-2">
                  <input
                    className="input w-full p-3"
                    placeholder="Definir"
                    value={
                      options_to_choose_value !== 1
                        ? options_to_choose_value
                        : ""
                    }
                    onChange={(e) => {
                      setValue("options_to_choose", Number(e.target.value));
                    }}
                  />
                </span>
              </button>
            </div>
          </div>

          <div>
            <label className="label block mt-2">Opciones</label>
            <div className="mt-4 grid gap-2">
              {Object.values(options).map((opt, i) => (
                <OptionItem
                  key={i}
                  name={opt.name}
                  price={opt.price}
                  onUpdate={handleUpdateOption(opt.id)}
                />
              ))}
              <OptionForm onSave={handleSaveOption} />
            </div>
            <span className="text-sm font-light block mt-2">
              El precio que ingreses se sumará al valor base del producto.
            </span>
            <button
              className="mt-4 text-purple-800 dark:text-purple-400 hover:underline text-sm"
              type="button"
            >
              + Agregar opción
            </button>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            className="text-sm button-outline w-full"
            onClick={() => {
              resetFieldsFromInitialValues();
              handleClose();
            }}
            type="button"
          >
            Volver
          </button>
          <button
            className="text-sm button w-full"
            onClick={handleSubmit(onSubmit)}
          >
            {!variant.id ? "Añadir Variante" : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductVariantModal;
