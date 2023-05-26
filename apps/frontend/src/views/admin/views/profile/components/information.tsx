import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TenantUpdateInformationForm } from "../../../../../api/tenant/types";
import ImageInput from "../../../../../components/form/image";
import PhoneInput from "../../../../../components/form/phone";
import TextInput from "../../../../../components/form/text";
import { getPrefixFromPhoneNumber } from "../../../../../helpers/phone";
import { onlyNumbersRegex } from "../../../../../helpers/regex";
import useTranslation from "../../../../../i18n/useTranslation";
import { useProfileContext } from "../context";

const ProfileInfoForm = () => {
  const { t } = useTranslation();
  const {
    state: { tenant },
    actions: { updateInformation, uploadImage },
  } = useProfileContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<TenantUpdateInformationForm>();

  const [loading, setLoading] = useState(false);
  const [phonePrefix, setPhonePrefix] = useState<string>(() =>
    getPrefixFromPhoneNumber(tenant?.phone || "")
  );
  const [profileImg, setProfileImg] = useState<File | null>(null);

  async function onSubmit(data: TenantUpdateInformationForm) {
    /* Setting the prefix with the phone */
    data.phone = `${phonePrefix}${data.phone}`;

    /* Uploading the profile img */
    if (profileImg) {
      const { url } = await uploadImage(profileImg);

      if (url) data.profile_img = url;
    }

    setLoading(true);
    await updateInformation(data);
    setLoading(false);
  }

  useEffect(() => {
    const prefix = getPrefixFromPhoneNumber(tenant?.phone || "");
    const phone = tenant?.phone.replace(prefix, "");
    setValue("phone", phone || "");
  }, []);

  return (
    <div className="grid gap-4">
      <div className="w-full card flex items-center justify-center flex-col p-14">
        <ImageInput
          id="profile"
          width={180}
          height={180}
          defaultUrl={tenant?.profile_img || ""}
          rounded="rounded-lg"
          className="h-40 w-40"
          onChange={(file) => setProfileImg(file)}
        />
        <span className="mt-4 text-sm label">
          {t("Allowed *.jpeg, *.jpg, *.png, *.gif")}
        </span>
        <span className="text-sm label">{t("Max size of 3.1 MB")}</span>
      </div>
      <form
        className="w-fullshadow-lg card p-6 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput
            label={t("Name")}
            full={true}
            error={errors.name?.message}
            inputProps={{
              placeholder: "MiTienda",
              ...register("name", {
                required: t("This field is required"),
                value: tenant?.name || "",
              }),
            }}
          />
          <TextInput
            label={t("Surname")}
            full={true}
            error={errors.surname?.message}
            inputProps={{
              placeholder: "MiTienda",
              ...register("surname", {
                required: t("This field is required"),
                value: tenant?.surname || "",
              }),
            }}
          />
          <TextInput
            label={t("Email Address")}
            full={true}
            inputProps={{
              placeholder: "example@text.com",
              disabled: true,
              defaultValue: tenant?.email,
            }}
          />
          <PhoneInput
            label={t("Phone Number")}
            full={true}
            error={errors.phone?.message}
            onPrefixChange={(prefix) => {
              setPhonePrefix(prefix);
            }}
            defaultPrefix={phonePrefix}
            inputProps={{
              placeholder: "999113934",
              ...register("phone", {
                required: t("This field is required"),
                pattern: {
                  value: onlyNumbersRegex,
                  message: t("Plese enter only numbers"),
                },
              }),
            }}
          />
        </div>

        <div className="flex justify-end mt-4">
          <button className="button text-sm" type="submit" disabled={loading}>
            {t("Save Changes")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoForm;
