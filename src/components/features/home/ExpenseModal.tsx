import { Button } from "antd";
import dayjs from "dayjs";
import Modal from "../../shared/Modal";
import { useForm } from "react-hook-form";
import { expenseSchema, type ExpenseFormType } from "../../../libs/zod/expense";
import { zodResolver } from "@hookform/resolvers/zod";
import { FORMAT_MONEY } from "../../../constants/regex";
import { useEffect, useMemo } from "react";
import type { ExpenseType } from "../../../types/expense";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { createFormController } from "@/libs/utils";

dayjs.extend(customParseFormat);

interface ExpenseModalProps {
    open: boolean;
    onClose: () => void;
    defaultValues: ExpenseType | null;
    onSubmit?: (data: ExpenseType) => void;
}


const TypedFormController = createFormController<ExpenseFormType>();
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
                    <TypedFormController
                        name="date"
                        control={control}
                        label="Ngày chi (dd/mm/yyyy)"
                        placeholder="Chọn ngày chi"
                        type="date"
                        required
                        error={errors.date?.message}
                    />
                </div>
                <div className="mb-4">
                    <TypedFormController
                        name="expenseType"
                        control={control}
                        label="Loại chi phí"
                        placeholder="Nhập loại chi phí"
                        type="textarea"
                        rows={2}
                        required
                        error={errors.expenseType?.message}
                    />
                </div>

                <div className="mb-4">
                    <TypedFormController
                        name="cost"
                        control={control}
                        label="Số tiền (vnđ)"
                        placeholder="Nhập số tiền"
                        type="number"
                        min={0}
                        required
                        error={errors.cost?.message}
                        formatter={(value) =>
                            value ? `${value}`.replace(FORMAT_MONEY, ",") : ""
                        }
                    />
                </div>

                <div className="mb-4">
                    <TypedFormController
                        name="quantity"
                        control={control}
                        label="Số lượng (Cái)"
                        placeholder="1"
                        type="number"
                        min={1}
                        required
                        error={errors.quantity?.message}
                    />
                </div>

                <div className="mb-4">
                    <TypedFormController
                        name="note"
                        control={control}
                        label="Ghi chú"
                        placeholder="Nhập ghi chú (nếu có)"
                        type="textarea"
                        rows={3}
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
