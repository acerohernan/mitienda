import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const inputClasses = cva("p-3", {
  variants: {
    variant: {
      primary: "input",
      error: "input-error",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputClasses> {
  full?: boolean;
  label?: string;
  optional?: boolean;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  forwardedRef
) {
  const { variant, full, label, optional, error } = props;

  return (
    <>
      {label ? (
        <label htmlFor={label} className="label mb-2 block">
          {label}
          {!optional && " *"}
        </label>
      ) : null}
      <input
        {...props}
        className={`${inputClasses({ variant: error ? "error" : variant })} ${
          full && "w-full"
        }`}
        ref={forwardedRef}
      />
      {error ? (
        <span className="input-error-message mt-2 block">{error}</span>
      ) : null}
    </>
  );
});

export default Input;
