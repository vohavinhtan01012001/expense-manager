/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import { Input as AntdInput } from "antd";
import type { InputProps, TextAreaProps } from "antd/es/input";

type CustomInputProps = (InputProps | TextAreaProps) & {
  label?: string;
  required?: boolean;
  textarea?: boolean;
  error?: string;
};

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, CustomInputProps>(
  ({ label, required, textarea, error, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="block mb-1 font-medium text-sm">
            {required && <span className="text-red-500 mr-1">*</span>}
            {label}
          </label>
        )}
        {textarea ? (
          <AntdInput.TextArea {...(props as TextAreaProps)} ref={ref} />
        ) : (
          <AntdInput {...(props as InputProps)} ref={ref as any} />
        )}
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
      </div>
    );
  }
);

export default Input;
