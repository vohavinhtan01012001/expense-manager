/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react';
import { DatePicker, type DatePickerProps } from 'antd';

interface DatePickerFieldProps extends DatePickerProps {
    label?: string;
    required?: boolean;
    error?: string;
}

const DatePickerField = forwardRef<any, DatePickerFieldProps>(
  ({ label, required = false, error, ...rest }, ref) => {
    return (
        <div className="mb-4">
            {label && (
                <label className="block mb-1 font-medium text-sm">
                    {required && <span className="text-red-500 mr-1">*</span>}
                    {label}
                </label>
            )}
            <DatePicker {...rest} ref={ref} className="w-full" format="DD/MM/YYYY" />
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>} 
        </div>
    );
});

export default DatePickerField;
