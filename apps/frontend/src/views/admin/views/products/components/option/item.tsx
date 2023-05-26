import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../../../../../components/form/text";
import { IVarianOption } from "../../context/types";

interface Props {
  name: string;
  price: string;
  onUpdate: (data: IVarianOption) => void;
}

const OptionItem: React.FC<Props> = ({ name, price, onUpdate }) => {
  const [saved, setSaved] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IVarianOption>();

  function onSubmit(data: IVarianOption) {
    onUpdate(data);
    setSaved(true);
  }

  const name_value = watch("name");
  const price_value = watch("price");

  return (
    <div>
      <div className="grid grid-cols-[2fr_1fr_50px] lg:grid-cols-[3fr_1fr_50px] items-start gap-4">
        {!saved && (
          <>
            <TextInput
              full
              error={errors.name?.message}
              inputProps={{
                placeholder: "Rojo",
                ...register("name", {
                  required: "Requerido",
                  value: name,
                }),
              }}
            />
            <TextInput
              full
              error={errors.price?.message}
              inputProps={{
                placeholder: "$ 7.00",
                ...register("price", {
                  required: "Requerido",
                  value: price,
                }),
              }}
            />
            <button
              className="input p-3 flex justify-center"
              type="button"
              onClick={handleSubmit(onSubmit)}
            >
              <CheckIcon className="w-5 h-5" />
            </button>
          </>
        )}
        {saved && (
          <>
            <span className="block p-3 w-full outiline-none text-sm">
              {name_value || name}
            </span>
            <span className="block p-3 w-full outiline-none text-sm">
              $ {price_value || price}
            </span>
            <button
              className="p-3 flex justify-center"
              type="button"
              onClick={() => setSaved(false)}
            >
              <PencilSquareIcon className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OptionItem;
