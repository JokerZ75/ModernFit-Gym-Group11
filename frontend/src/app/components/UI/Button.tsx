"use client";

import React, { forwardRef } from "react";
import { ButtonHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/app/utils/classMerge";

const buttonVariants = cva("text-white text-lg font-bold py-2 px-6", {
  variants: {
    variant: {
      default: "bg-orange-100",
      darkBlue: "bg-blue-200",
      lightBlue: "bg-blue-100",
    },
    size: {
      default: "py-2 px-6",
      small: "py-1 px-4",
      large: "py-3 px-8",
      fillWidth: "w-full",
    },
    rounded: {
      default: "rounded",
      square: "rounded-none",
      roundedMd: "rounded-md",
      circle: "rounded-full",
    },
    shadow: {
      default: "shadow-md",
      shadowLg: "shadow-lg",
      shadowXl: "shadow-xl",
      shadow2xl: "shadow-2xl",
    },
    hover: {
      default: "hover:bg-orange-200",
      hoverDarkBlue: "hover:bg-blue-300",
      hoverLightBlue: "hover:bg-blue-200",
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
      shadow: "default",
      hover: "default",
    },
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, size, variant, rounded, hover, shadow, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, rounded, hover, shadow, className })
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export { Button, buttonVariants };
