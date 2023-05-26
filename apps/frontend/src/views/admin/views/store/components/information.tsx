import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StoreUpdateInformationForm } from "../../../../../api/store/types";
import PhoneInput from "../../../../../components/form/phone";
import Select from "../../../../../components/form/select";
import TextInput from "../../../../../components/form/text";
import { getPrefixFromPhoneNumber } from "../../../../../helpers/phone";
import { onlyNumbersRegex } from "../../../../../helpers/regex";
import useTranslation from "../../../../../i18n/useTranslation";
import { useAdminStoreContext } from "../context";

interface StoreCategory {
  name: string;
}
const CATEGORIES: StoreCategory[] = [
  { name: "Cerezas y Manzanas" },
  { name: "Pantalones y joggers" },
  { name: "Instrumentos musicales" },
];

const AdminStoreInfoForm = () => {
  const {
    state: { store },
    actions: { updateInformation },
  } = useAdminStoreContext();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<StoreUpdateInformationForm>();

  const [loading, setLoading] = useState(false);

  const [telephonePrefix, setTelephonePrefix] = useState(() =>
    getPrefixFromPhoneNumber(store?.telephone || "")
  );
  const [whatsappPrefix, setWhatsappPrefix] = useState(() =>
    getPrefixFromPhoneNumber(store?.whatsapp || "")
  );

  async function onSubmit(data: StoreUpdateInformationForm) {
    data.telephone = `${telephonePrefix}${data.telephone}`;
    data.whatsapp = `${whatsappPrefix}${data.whatsapp}`;

    setLoading(true);
    await updateInformation(data);
    setLoading(false);
  }

  useEffect(() => {
    let telephonePrefix = getPrefixFromPhoneNumber(store?.telephone || "");
    let phone = store?.telephone.replace(telephonePrefix, "");
    setValue("telephone", phone);

    let whatsappPrefix = getPrefixFromPhoneNumber(store?.whatsapp || "");
    let wspt = store?.whatsapp.replace(whatsappPrefix, "");
    setValue("whatsapp", wspt);

    setValue("category", store?.category);
  }, []);

  return (
    <form className="w-full card p-6 " onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-5 md:grid-cols-2">
        <TextInput
          label={t("Store Name")}
          full={true}
          error={errors.name?.message}
          inputProps={{
            placeholder: "MiTienda",
            ...register("name", {
              required: t("This field is required"),
              value: store?.name || "",
            }),
          }}
        />
        <PhoneInput
          label={t("Phone Number")}
          full={true}
          error={errors.telephone?.message}
          onPrefixChange={(prefix) => setTelephonePrefix(prefix)}
          defaultPrefix={telephonePrefix}
          inputProps={{
            placeholder: "999113934",
            ...register("telephone", {
              required: t("This field is required"),
              pattern: {
                value: onlyNumbersRegex,
                message: t("Plese enter only numbers"),
              },
            }),
          }}
        />
        <div>
          <label className="label block mb-2">{t("Category")}</label>
          <Select
            items={CATEGORIES.map((cat) => ({
              component: <>{cat.name}</>,
              value: cat.name,
            }))}
            selectedOption={{
              component: <>{store?.category}</>,
              value: store?.category,
            }}
            onChange={(opt) => setValue("category", opt.value)}
            className="w-full input p-3 z-0"
            optionsContainerClassname="w-full"
          />
        </div>
        <TextInput
          label={t("Country")}
          full={true}
          inputProps={{
            defaultValue: store?.country,
            disabled: true,
          }}
        />
        <TextInput
          label={t("Currency")}
          full={true}
          error={errors.currency?.message}
          inputProps={{
            placeholder: "MiTienda",
            disabled: true,
            ...register("currency", {
              required: t("This field is required"),
              value: store?.currency,
            }),
          }}
        />
        <PhoneInput
          label={"Whatsapp"}
          full={true}
          error={errors.whatsapp?.message}
          defaultPrefix={whatsappPrefix}
          onPrefixChange={(prefix) => setWhatsappPrefix(prefix)}
          inputProps={{
            placeholder: "999113934",
            ...register("whatsapp", {
              required: t("This field is required"),
              pattern: {
                value: onlyNumbersRegex,
                message: t("Plese enter only numbers"),
              },
            }),
          }}
        />
        <div className="col-span-2">
          <TextInput
            label={"Description"}
            full={true}
            error={errors.description?.message}
            optional
            textarea
            inputProps={{
              ...register("description", {
                value: store?.description || "",
              }),
              rows: 5,
            }}
          />
        </div>
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

export default AdminStoreInfoForm;
