import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TenantForgotPasswordForm } from "../../api/tenant/types";
import TextInput from "../../components/form/text";
import { emailRegex } from "../../helpers/regex";
import useTranslation from "../../i18n/useTranslation";
import { useAuthContext } from "./context";

const ForgotPasswordView = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TenantForgotPasswordForm>();
  const { t } = useTranslation();
  const {
    actions: { forgotPassword },
  } = useAuthContext();

  const email_value = watch("email");

  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(false);

  async function onSubmit(form: TenantForgotPasswordForm) {
    setLoading(true);
    await forgotPassword(form);
    setSended(true);
    setLoading(false);
  }

  return (
    <div className="px-6 h-screen flex items-center">
      <div className=" w-full max-w-md mx-auto">
        <h1 className="text-3xl font-medium">Forgot your password?</h1>
        {!sended && (
          <>
            <div className="mt-2">
              <span className="font-light">
                Please enter the email address associated with your account and
                We will email you a link to reset your password.
              </span>
            </div>
            <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                label="Email address"
                full
                error={errors.email?.message}
                inputProps={{
                  placeholder: "test@example.test",
                  ...register("email", {
                    required: t("This field is required"),
                    pattern: {
                      value: emailRegex,
                      message: "Enter a valid email",
                    },
                  }),
                }}
              />
              <button
                className="w-full py-3 bg-dark-500 text-white rounded-lg font-medium mt-8 dark:bg-slate-50 dark:text-dark-800 dark:hover:bg-slate-200 dark:focus:bg-slate-200 transition-all hover:bg-dark-800 focus:bg-dark-800 disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                Send code
              </button>
            </form>
          </>
        )}
        {sended && (
          <div className="my-4 mb-10">
            <span className="font-light">
              The code was sent to{" "}
              <span className="font-medium dark:text-white">
                {" "}
                {email_value}{" "}
              </span>
              successfully. If the email not appear in 3 minutes, please check
              the spam folder. Also you can comunicate with{" "}
              <a
                className="font-medium dark:text-white hover:underline cursor-pointer"
                href="mailto:suppot@mitienda.com"
              >
                suppot@mitienda.com
              </a>
            </span>
          </div>
        )}
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

export default ForgotPasswordView;
