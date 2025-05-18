/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFormController } from "@/libs/utils";
import type { RegisterFormType } from "@/libs/zod/auth";
import { registerSchema } from "@/libs/zod/auth";
import { Button, notification } from "antd";
import { register as registerUser } from "@/api/expenses";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";

const TypedFormController = createFormController<RegisterFormType>();

export default function Register() {
    const setToken = useAuthStore((state) => state.setToken);
    const router = useNavigate()
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: RegisterFormType) => {
        try {
            const token = await registerUser(data);
            if (token) {
                setToken(token);
                window.location.href = "/login";
            }
        } catch (error: any) {
            notification.error({
                message: "Lỗi đăng ký",
                description: error?.message || "Đăng ký không thành công!",
            });
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white max-w-lg shadow-2xl rounded-xl p-8 w-full h-[700px]">
                <h1 className="uppercase tracking-widest text-4xl mb-8 font-bold text-center">Đăng ký</h1>
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
                    <TypedFormController
                        name="confirmPassword"
                        control={control}
                        label="Nhập lại mật khẩu"
                        placeholder="Xác nhận mật khẩu"
                        type="password"
                        required
                        error={errors.confirmPassword?.message}
                        className="h-[45px]"
                    />
                    <Button
                        type="default"
                        htmlType="submit"
                        loading={isSubmitting}
                        className="mt-2 !h-[50px] !text-lg !font-semibold !bg-cyan-500 hover:!bg-cyan-600 !text-white border-none"
                    >
                        Đăng ký
                    </Button>
                    <Button
                        type="default"
                        htmlType="button"
                        onClick={() => router('/login')}
                        className="mt-2 !h-[50px] !text-lg !font-semibold !bg-white hover:!bg-cyan-200 !text-black border-none"
                    >
                        Đăng nhập
                    </Button>
                </form>
            </div>
        </div>
    );
}
