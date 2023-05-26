import { useState } from "react";
import { useForm } from "react-hook-form";
import { StoreUpdateSocialForm } from "../../../../../api/store/types";
import TextInput from "../../../../../components/form/text";
import useTranslation from "../../../../../i18n/useTranslation";
import { IStoreSocial } from "../../../../store/types";
import { useAdminStoreContext } from "../context";

const AdminStoreSocialForm = () => {
  const {
    state: { store },
    actions: { updateSocial },
  } = useAdminStoreContext();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues, isDirty },
  } = useForm<StoreUpdateSocialForm>();

  const [loading, setLoading] = useState(false);

  async function onSubmit(data: StoreUpdateSocialForm) {
    setLoading(true);
    await updateSocial(data);
    setLoading(false);
  }

  function formatWord(word: string): string {
    return `${word.slice(0, 1).toLocaleUpperCase()}${word.slice(1)}`;
  }

  const keysArr: Array<keyof IStoreSocial> = store?.social
    ? (Object.keys(store?.social) as Array<keyof IStoreSocial>)
    : [];

  return (
    <form
      className="w-full card p-6 max-h-[650px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
        {keysArr.map((key: keyof IStoreSocial, i) => {
          if (key === "id" || key === "store_id") return;

          return (
            <div key={i}>
              <span className="label block mb-2">{formatWord(key)}</span>
              <div className="grid grid-cols-[120px_1fr] items-center">
                <span className="text-sm text-slate-400 dark:text-slate-500">{`${key}.com/`}</span>
                <TextInput
                  full={true}
                  optional
                  className="ml-2"
                  error={errors[key]?.message}
                  inputProps={{
                    ...register(key, {
                      value: store?.social[key],
                    }),
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-4">
        <button
          className="button text-sm"
          type="submit"
          disabled={!isDirty || loading}
        >
          {t("Save Changes")}
        </button>
      </div>
    </form>
  );
};

export default AdminStoreSocialForm;
