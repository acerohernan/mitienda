import { CheckIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import TextInput from "../../../../../../components/form/text";

export interface OptionFormValues {
  id: string;
  name: string;
  price: string;
}

interface Props {
  onSave: (data: OptionFormValues) => void;
}

const OptionForm: React.FC<Props> = ({ onSave }) => {
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<OptionFormValues>();

  function onSubmit(form: OptionFormValues) {
    onSave(form);
    setValue("name", "");
    setValue("price", "");
    setFocus("name");
  }

  return (
    <div className="grid grid-cols-[2fr_1fr_50px] lg:grid-cols-[3fr_1fr_50px] items-start gap-4">
      <TextInput
        full
        error={errors.name?.message}
        inputProps={{
          placeholder: "Rojo",
          ...register("name", {
            required: "Requerido",
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
    </div>
  );
};

export default OptionForm;
