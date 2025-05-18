import { z as zod } from "zod";

export const loginSchema = zod.object({
  email: zod
    .string({
      required_error: "Vui lòng nhập email!",
      invalid_type_error: "Email không hợp lệ!",
    })
    .email("Email không đúng định dạng!"),
  password: zod
    .string({
      required_error: "Vui lòng nhập mật khẩu!",
      invalid_type_error: "Mật khẩu không hợp lệ!",
    })
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự!"),
});

export type LoginFormType = zod.infer<typeof loginSchema>;


export const registerSchema = zod
  .object({
    email: zod
      .string({
        required_error: "Vui lòng nhập email!",
        invalid_type_error: "Email không hợp lệ!",
      })
      .email("Email không đúng định dạng!"),
    password: zod
      .string({
        required_error: "Vui lòng nhập mật khẩu!",
        invalid_type_error: "Mật khẩu không hợp lệ!",
      })
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự!"),
    confirmPassword: zod
      .string({
        required_error: "Vui lòng xác nhận mật khẩu!",
        invalid_type_error: "Mật khẩu xác nhận không hợp lệ!",
      })
      .min(6, "Mật khẩu xác nhận phải có ít nhất 6 ký tự!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu xác nhận không khớp!",
  });

export type RegisterFormType = zod.infer<typeof registerSchema>;