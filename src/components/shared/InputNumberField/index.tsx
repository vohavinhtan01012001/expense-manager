/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import { InputNumber, type InputNumberProps } from "antd";

interface InputNumberFieldProps extends InputNumberProps {
  label?: string;
  required?: boolean;
  error?: string;
}

const InputNumberField = forwardRef<any, InputNumberFieldProps>(
  ({ label, required = false, error, ...rest }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="block mb-1 font-medium text-sm">
            {required && <span className="text-red-500 mr-1">*</span>}
            {label}
          </label>
        )}
        <InputNumber
          {...rest}
          ref={ref} 
          className="!w-full"
        />
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
      </div>
    );
  }
);

export default InputNumberField;
