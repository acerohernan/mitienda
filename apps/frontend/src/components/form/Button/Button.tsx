import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonClasses = cva("btn", {
  variants: {
    variant: {
      primary: "button",
      outline: "button-outline",
      danger: "button-outline-danger",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "ref">,
    VariantProps<typeof buttonClasses> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props,
  forwardedRef
) {
  const { children, variant } = props;

  return (
    <button
      {...props}
      className={`${buttonClasses({ variant })}`}
      ref={forwardedRef}
    >
      {children}
    </button>
  );
});

export default Button;
