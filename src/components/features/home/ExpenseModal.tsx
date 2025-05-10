import { Button } from "antd";
import dayjs from "dayjs";
import Modal from "../../shared/Modal";
import { useForm, Controller } from "react-hook-form";
import { expenseSchema, type ExpenseFormType } from "../../../libs/zod/expense";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePickerField from "../../shared/DatePickerField";
import Input from "../../shared/Input";
import InputNumberField from "../../shared/InputNumberField";
import { FORMAT_MONEY } from "../../../constants/regex";
import { useEffect, useMemo } from "react";
import type { ExpenseType } from "../../../types/expense";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

interface ExpenseModalProps {
    open: boolean;
    onClose: () => void;
    defaultValues: ExpenseType | null;
    onSubmit?: (data: ExpenseType) => void;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({
    open,
    onClose,
    defaultValues = null,
    onSubmit
}) => {
    const initValues = useMemo(() => ({
        date: dayjs(),
        cost: 0,
        expenseType: "",
        note: "",
        quantity: 1,
    }), []);
    const { control, handleSubmit, reset, formState: { errors } } = useForm<ExpenseFormType>({
        resolver: zodResolver(expenseSchema),
        defaultValues: initValues
    });

    useEffect(() => {
        if (defaultValues) {
            const dateValue = dayjs(defaultValues.date, 'DD/MM/YYYY');
            reset({
                ...defaultValues,
                date: dateValue
            });
        }
        else {
            reset(initValues);
        }
    }, [defaultValues, initValues, reset])

    const handleCancel = () => {
        reset(initValues);
        onClose();
    };

    const onFormSubmit = async (values: ExpenseFormType) => {
        const formatted = {
            ...values,
            date: dayjs(values.date).format("DD/MM/YYYY"),
        };
        onSubmit?.(formatted);
        handleCancel();
    };

    return (
        <Modal
            title={defaultValues?.id ? "Chỉnh sửa Chi Phí" : "Thêm Chi Phí"}
            open={open}
            onCancel={handleCancel}
        >
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="mb-4">
                    <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                            <DatePickerField
                                label="Ngày chi (dd/mm/yyyy)"
                                placeholder="Chọn ngày chi"
                                required
                                {...field}
                                error={errors.date?.message}
                            />
                        )}
                    />
                </div>

                <div className="mb-4">
                    <Controller
                        name="expenseType"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="Loại chi phí"
                                required
                                placeholder="Nhập loại chi phí"
                                rows={2}
                                textarea
                                {...field}
                                error={errors.expenseType?.message}
                            />
                        )}
                    />
                </div>

                <div className="mb-4">
                    <Controller
                        name="cost"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <InputNumberField
                                    {...field}
                                    label="Số tiền (vnđ)"
                                    required
                                    className="!w-full"
                                    min={0}
                                    placeholder="Nhập số tiền"
                                    formatter={(value) => (value ? `${value}`.replace(FORMAT_MONEY, ",") : "")}
                                    error={errors.cost?.message}
                                />
                            </div>
                        )}
                    />
                </div>

                <div className="mb-4">
                    <Controller
                        name="quantity"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <InputNumberField
                                    {...field}
                                    label="Số lượng (Cái)"
                                    required
                                    className="!w-full"
                                    min={1}
                                    placeholder="1"
                                    error={errors.quantity?.message}
                                />
                            </div>
                        )}
                    />
                </div>

                <div className="mb-4">
                    <Controller
                        name="note"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="Ghi chú"
                                placeholder="Nhập ghi chú (nếu có)"
                                textarea
                                rows={3}
                                {...field}
                            />
                        )}
                    />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <Button onClick={handleCancel}>Hủy</Button>
                    <Button variant="solid" color="cyan" htmlType="submit">
                        {defaultValues?.id ? "Cập nhật" : "Tạo chi phí"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default ExpenseModal;
