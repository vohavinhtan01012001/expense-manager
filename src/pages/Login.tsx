/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFormController } from "@/libs/utils";
import type { LoginFormType } from "@/libs/zod/auth";
import { loginSchema } from "@/libs/zod/auth";
import { Button, notification } from "antd";
import { login } from "@/api/expenses";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";

const TypedFormController = createFormController<LoginFormType>();

export default function Login() {
  const setToken = useAuthStore((state) => state.setToken);
  const router = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    try {
      const token = await login(data);
      if (token) {
        setToken(token);
      }
    } catch (error: any) {
      notification.error({
        message: "Lỗi đăng nhập",
        description: error?.message || "Đăng nhập không thành công!",
      });
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white max-w-lg shadow-2xl rounded-xl p-8 w-full h-[600px]">
        <h1 className="uppercase tracking-widest text-4xl mb-8 font-bold text-center">Đăng nhập</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <TypedFormController
            name="email"
            control={control}
            label="Email"
            placeholder="Nhập email"
            type="text"
            required
            error={errors.email?.message}
            className="h-[45px]"
          />
          <TypedFormController
            name="password"
            control={control}
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            type="password"
            required
            error={errors.password?.message}
            className="h-[45px]"
          />
          <Button
            type="default"
            htmlType="submit"
            loading={isSubmitting}
            className="mt-2 !h-[50px] !text-lg !font-semibold !bg-cyan-500 hover:!bg-cyan-600 !text-white border-none"
          >
            Đăng nhập
          </Button>
          <Button
            type="default"
            htmlType="button"
            onClick={() => router('/register')}
            className="mt-2 !h-[50px] !text-lg !font-semibold !bg-white hover:!bg-cyan-200 !text-black border-none"
          >
            Đăng ký
          </Button>
        </form>
      </div>
    </div>
  );

}
