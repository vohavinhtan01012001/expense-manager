import { z as zod } from "zod";
import { Dayjs } from "dayjs";

export const expenseSchema = zod.object({
    date: zod.custom<Dayjs>((value) => {
        return typeof value === "object" && value !== null && "isValid" in value && (value as Dayjs).isValid();
    }, {
        message: "Vui lòng chọn ngày hợp lệ!",
    }),
    expenseType: zod
        .string({
            required_error: "Vui lòng nhập loại chi phí!",
            invalid_type_error: "Loại chi phí không hợp lệ!",
        })
        .nonempty("Vui lòng nhập loại chi phí!"),
    cost: zod
        .number({
            required_error: "Vui lòng nhập số tiền!",
            invalid_type_error: "Số tiền không hợp lệ!",
        })
        .min(0, "Số tiền phải lớn hơn 0"),
    quantity: zod
        .number({
            invalid_type_error: "Số lượng không hợp lệ!",
        })
        .min(0, "Số lượng không hợp lệ!"),
    note: zod.string().optional(),
});

export type ExpenseFormType = zod.infer<typeof expenseSchema>;
