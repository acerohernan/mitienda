import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface Props {
  label?: string;
  full?: boolean;
  error?: string;
  inputProps?: Object;
  className?: string;
  optional?: boolean;
}

const PasswordInput: React.FC<Props> = ({
  className,
  full,
  label,
  error,
  inputProps,
  optional,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      {label ? (
        <label htmlFor="name" className="label mb-2 inline-block">
          {label}
          {!optional && " *"}
        </label>
      ) : null}
      <div className="relative">
        <input
          id="name"
          className={`${error ? "input-error" : "input"} p-3 ${className} ${
            full && "w-full"
          }`}
          type={show ? "text" : "password"}
          {...inputProps}
        />
        <button
          className="absolute right-0 group p-3"
          type="button"
          onClick={() => setShow(!show)}
        >
          {show ? (
            <EyeSlashIcon className="w-5 h-5 transition-all group-hover:scale-110" />
          ) : (
            <EyeIcon className="w-5 h-5 transition-all group-hover:scale-110" />
          )}
        </button>
      </div>
      {error ? (
        <span className="input-error-message mt-2 inline-block">{error}</span>
      ) : null}
    </div>
  );
};

export default PasswordInput;
