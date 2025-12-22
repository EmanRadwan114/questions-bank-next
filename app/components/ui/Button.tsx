"use client";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: React.FC<IProps> = ({ children, className, ...rest }) => {
  return (
    <button
      className={`px-6 font-semibold py-2 bg-primary/85 text-white dark:text-foreground rounded-sm cursor-pointer hover:bg-primary transition-colors disabled:cursor-not-allowed disabled:bg-primary/40 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
