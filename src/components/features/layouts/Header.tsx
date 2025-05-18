import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "antd";

export default function Header() {
    const handleLogOut = () => {
        useAuthStore.getState().logout();
    }
    return (
        <div className="fixed h-[100px] top-6 right-6 w-[200px]">
            <Button onClick={handleLogOut} className="w-full h-full !font-semibold !bg-cyan-500 hover:!bg-cyan-600 !text-white border-none" type="primary">
                Đăng xuất
            </Button>
        </div>
    )
}
