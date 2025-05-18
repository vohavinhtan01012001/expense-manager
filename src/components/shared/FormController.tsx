import Input from "./Input";
import DatePickerField from "./DatePickerField";
import InputNumberField from "./InputNumberField";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { cn } from "@/libs/utils";

type FieldType = "text" | "textarea" | "number" | "date" | "password";

export interface FormControllerProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    control: Control<T>;
    error?: string;
    required?: boolean;
    placeholder?: string;
    type?: FieldType;
    rows?: number;
    min?: number;
    formatter?: (value?: string | number) => string;
    className?: string;
}

function FormController<T extends FieldValues>({
    name,
    label,
    control,
    error,
    required,
    placeholder,
    type = "text",
    rows,
    min,
    formatter,
    className
}: FormControllerProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                switch (type) {
                    case "date":
                        return (
                            <DatePickerField
                                {...field}
                                label={label}
                                required={required}
                                placeholder={placeholder}
                                error={error}
                                className={cn(className)}
                            />
                        );
                    case "number":
                        return (
                            <InputNumberField
                                {...field}
                                label={label}
                                required={required}
                                placeholder={placeholder}
                                error={error}
                                min={min}
                                formatter={formatter}
                                className={cn("!w-full", className)
                                }
                            />
                        );
                    case "textarea":
                        return (
                            <Input
                                {...field}
                                label={label}
                                required={required}
                                placeholder={placeholder}
                                error={error}
                                textarea
                                rows={rows || 3}
                                className={cn(className)}
                            />
                        );
                    case "password":
                        return (
                            <Input
                                {...field}
                                label={label}
                                required={required}
                                placeholder={placeholder}
                                error={error}
                                type="password"
                                className={cn(className)}
                            />
                        );
                    default:
                        return (
                            <Input
                                {...field}
                                label={label}
                                required={required}
                                placeholder={placeholder}
                                error={error}
                                className={cn(className)}
                            />
                        );
                }
            }}
        />
    );
}
export default FormController;
