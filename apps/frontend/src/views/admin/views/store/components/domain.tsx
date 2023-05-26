import { ChangeEvent, useState } from "react";
import TextInput from "../../../../../components/form/text";
import useTranslation from "../../../../../i18n/useTranslation";
import { useAdminStoreContext } from "../context";

const AdminStoreDomain = () => {
  const {
    state: { store },
  } = useAdminStoreContext();
  const { t } = useTranslation();
  const [domain, setDomain] = useState<string>(store?.domain || "");
  const avaiable = domain !== store?.domain;

  return (
    <div className="card w-full p-6" style={{ maxHeight: "255px" }}>
      <span className="label block mb-2">{t("Update your domain")}</span>
      <div className="grid grid-cols-[130px_1fr] items-center gap-2 w-full">
        <span className="p-3">mitienda.com/</span>
        <TextInput
          className="w-full"
          inputProps={{
            defaultValue: store?.domain,
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
              setDomain(event.target.value),
          }}
        />
      </div>
      <span className="block label mt-4">
        {t(
          "We provide you with a MiTienda subdomain. It is personalized with the name of your brand. (Maximum 20 characters)"
        )}
      </span>
      <div className="flex justify-end mt-4">
        <button className="button text-sm" disabled={!avaiable}>
          {t("Save Changes")}
        </button>
      </div>
    </div>
  );
};

export default AdminStoreDomain;
