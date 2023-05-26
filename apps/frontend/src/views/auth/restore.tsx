import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { API } from "../../api";
import { TenantRestorePasswordForm } from "../../api/tenant/types";
import PasswordInput from "../../components/form/password";
import { getHttpError } from "../../helpers/httpError";
import { passwordRegex } from "../../helpers/regex";
import { useToast } from "../../hooks/useToast";
import useTranslation from "../../i18n/useTranslation";

interface Props {
  isAValidCode: boolean;
  code: string;
}

const RestorePasswordView: React.FC<Props> = ({ isAValidCode, code }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TenantRestorePasswordForm>();
  const { t } = useTranslation();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(false);

  async function onSubmit(form: TenantRestorePasswordForm) {
    form.code = code;

    setLoading(true);
    await restorePassword(form);
    setSended(true);
    setLoading(false);
  }

  async function restorePassword(form: TenantRestorePasswordForm) {
    try {
      await API.tenant.restorePassword(form);
    } catch (err) {
      toast.error(getHttpError(err));
    }
  }

  const password_value = watch("password");

  return (
    <div className="px-6 h-screen flex items-center">
      <div className=" w-full max-w-md mx-auto">
        <h1 className="text-3xl font-medium">Restore Password</h1>
        {isAValidCode && !sended && (
          <>
            <div className="mt-2">
              <span className="font-light">
                Enter your new password that you will use to sign in.
              </span>
            </div>
            <form
              className="mt-10 grid gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <PasswordInput
                label="Password"
                full
                error={errors.password?.message}
                inputProps={{
                  placeholder: "********",
                  ...register("password", {
                    required: t("This field is required"),
                    pattern: {
                      value: passwordRegex,
                      message:
                        "The password must have one uppercase, one number and 8 characters minimun",
                    },
                  }),
                }}
              />
              <PasswordInput
                label="Password confirmation"
                full
                error={errors.re_password?.message}
                inputProps={{
                  placeholder: "********",
                  ...register("re_password", {
                    required: t("This field is required"),
                    validate: (value) =>
                      value === password_value || "The passwords do not match",
                  }),
                }}
              />
              <button
                className="w-full py-3 bg-dark-500 text-white rounded-lg font-medium mt-6 dark:bg-slate-50 dark:text-dark-800 dark:hover:bg-slate-200 dark:focus:bg-slate-200 transition-all hover:bg-dark-800 focus:bg-dark-800 disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                Restore password
              </button>
            </form>
          </>
        )}
        {!isAValidCode && (
          <div className="my-4 mb-10">
            <span className="font-light">
              The link to restore the password is invalid, please verify if is
              the same link that we provide you. If the problem persist,{" "}
              <Link
                className="hover:underline font-medium"
                href="/forgot-password"
              >
                request another link
              </Link>{" "}
              or send an email to{" "}
              <a
                className="font-medium dark:text-white hover:underline cursor-pointer"
                href="mailto:suppot@mitienda.com"
              >
                suppot@mitienda.com
              </a>
              .
            </span>
          </div>
        )}
        {isAValidCode && sended ? (
          <div className="my-4 mb-10">
            <span className="font-light">
              Your password has been restored successfully. You can use it to
              sign in.
            </span>
          </div>
        ) : null}
        <Link
          href="/login"
          className="text-sm font-light underline block text-center mt-2 dark:text-white"
        >
          Return to sign in
        </Link>
      </div>
    </div>
  );
};

export default RestorePasswordView;
