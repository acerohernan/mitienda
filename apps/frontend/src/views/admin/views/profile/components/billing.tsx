import useTranslation from "../../../../../i18n/useTranslation";

const ProfileBilling = () => {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <div className="card w-full p-6">
          <span className="block section-title">{t("Your Plan")}</span>
          <span className="block font-medium text-3xl mt-4">MiTienda PRO</span>
          <div className="flex justify-end">
            <button className="button-outline mt-8 text-sm">
              {t("Upgrade Plan")}
            </button>
          </div>
        </div>
        <div className="card p-6 mt-4">
          <div className="flex items-center justify-between">
            <span className="section-title">{t("Plan")}</span>
            <span className="text-sm">MiTienda PRO</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="section-title">{t("Expiration Date")}</span>
            <span className="text-sm">21/14/20</span>
          </div>
        </div>
      </div>
      <div className="card p-6">
        <span className="block section-title">{t("Invoice History")}</span>
        <div className="flex items-center justify-center h-40 lg:h-full">
          <span>{t("No invoices yet")}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileBilling;
