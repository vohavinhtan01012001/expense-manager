import Header from "@/components/features/layouts/Header"

type AdminLayoutProps = {
    children?: React.ReactNode
}
export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className='bg-gray-50'>
            <Header />
            {children}
        </div>
    )
}
