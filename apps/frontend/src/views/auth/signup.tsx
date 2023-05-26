import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TenantSignupForm } from "../../api/tenant/types";
import PasswordInput from "../../components/form/password";
import PhoneInput from "../../components/form/phone";
import TextInput from "../../components/form/text";
import { IPrefix, prefixes } from "../../constants/countries";
import {
  emailRegex,
  onlyNumbersRegex,
  passwordRegex,
} from "../../helpers/regex";
import useTranslation from "../../i18n/useTranslation";
import { useAuthContext } from "./context";

const SignupView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TenantSignupForm>();

  const { t } = useTranslation();
  const {
    actions: { signup },
  } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [prefix, setPrefix] = useState("1");

  async function onSubmit(form: TenantSignupForm) {
    /* Country code */
    const country_code = getCountryCodeFromPrefix(prefix);
    form.country_code = country_code;

    /* Phone */
    form.phone = `${prefix}${form.phone}`;

    setLoading(true);
    await signup(form);
    setLoading(false);
  }

  function getCountryCodeFromPrefix(prefix: string): string {
    const item: IPrefix = prefixes[prefix];

    if (!item) return prefixes["1"].country;

    return item.country;
  }

  return (
    <div className="px-6 h-screen flex items-center">
      <div className=" w-full max-w-md mx-auto">
        <h1 className="text-3xl font-medium">Get started absolutely free</h1>
        <div className="mt-2">
          <span className="font-light">Already have an account?</span>
          <Link
            className="text-purple-700 dark:text-purple-500 hover:underline ml-1"
            href="/login"
          >
            Sign in
          </Link>
        </div>
        <form className="mt-10 grid gap-3" onSubmit={handleSubmit(onSubmit)}>
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
          <PhoneInput
            full
            onPrefixChange={(prefix) => setPrefix(prefix)}
            label="Phone number"
            error={errors.phone?.message}
            inputProps={{
              placeholder: "999113934",
              ...register("phone", {
                required: t("This field is required"),
                pattern: {
                  value: onlyNumbersRegex,
                  message: "Enter only numbers",
                },
              }),
            }}
          />
          <button
            className="w-full py-3 bg-dark-500 text-white rounded-lg font-medium mt-7 dark:bg-slate-50 dark:text-dark-800 dark:hover:bg-slate-200 transition-all hover:bg-dark-800 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            Create account
          </button>
          <span className="text-xs font-light block text-center">
            By signing up, I agree to
            <a className="underline cursor-pointer font-medium">
              {" "}
              Terms of Service{" "}
            </a>
            and{" "}
            <a className="underline cursor-pointer font-medium">
              {" "}
              Privacy Policy{" "}
            </a>
            .
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignupView;
