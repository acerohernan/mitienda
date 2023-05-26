import useTranslation from "../../../i18n/useTranslation";

const AdminHomeView = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div>
        <span className="font-medium text-2xl dark:text-white">
          {t("Administrator")}
        </span>
        <div className="flex items-center gap-5 mt-3">
          <span className="text-sm text-slate-400"> {t("Administrator")}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminHomeView;
