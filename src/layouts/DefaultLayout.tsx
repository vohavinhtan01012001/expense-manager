
type DefaultLayoutProps = {
    children?: React.ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div className='bg-gray-50 min-h-screen'>
            {children}
        </div>
    )
}
