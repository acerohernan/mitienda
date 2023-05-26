import { useState } from "react";
import ImageInput from "../../../../../components/form/image";
import useTranslation from "../../../../../i18n/useTranslation";
import { useAdminStoreContext } from "../context";

const AdminStoreDesign = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const { t } = useTranslation();
  const {
    actions: { updateInformation, uploadImage },
    state: { store },
  } = useAdminStoreContext();

  async function handleSubmit() {
    let form: any = {};

    if (logoFile) {
      const { url } = await uploadImage(logoFile);

      if (url) {
        setLogoFile(null);
        form["logo_img"] = url;
      }
    }

    if (bannerFile) {
      const { url } = await uploadImage(bannerFile);

      if (url) {
        setBannerFile(null);
        form["banner_img"] = url;
      }
    }

    if (Object.keys(form).length > 0) {
      await updateInformation({ ...form });
    }
  }

  return (
    <div className="w-full card">
      <div className="mt-4 p-6 grid lg:grid-cols-[1fr_2fr] items-start  max-w-4xl mx-auto lg:gap-8">
        <div className=" flex items-center justify-center flex-col">
          <div className="block w-40 text-start label mb-2">{t("Logo")}</div>
          <ImageInput
            id="logo"
            width={180}
            height={160}
            className="h-40 w-40"
            rounded="rounded-lg"
            defaultUrl={store?.logo_img || ""}
            onChange={(file) => setLogoFile(file)}
          />
          <span className="mt-4 text-sm text-center label">
            {t("Allowed *.jpeg, *.jpg, *.png, *.gif")}
          </span>
          <span className="text-sm label">{t("Max size of 3.1 MB")}</span>
        </div>
        <div className=" flex items-center justify-center flex-col ">
          <div className="block w-full text-start label mb-2 max-w-lg">
            {t("Banner")}
          </div>
          <ImageInput
            id="banner"
            width={500}
            height={160}
            className="h-24 sm:h-40 w-full max-w-lg"
            rounded="rounded-lg"
            defaultUrl={store?.banner_img || ""}
            onChange={(file) => setBannerFile(file)}
          />
          <span className="mt-4 text-sm label">
            {t("Recommended (1000x300)")}
          </span>
          <span className="text-sm label">{t("Max size of 3.1 MB")}</span>
        </div>
      </div>
      <div className="flex justify-end mt-0 m-6">
        <button
          className="button text-sm"
          type="button"
          onClick={handleSubmit}
          disabled={!logoFile && !bannerFile}
        >
          {t("Save Changes")}
        </button>
      </div>
    </div>
  );
};

export default AdminStoreDesign;
