import AdminLayout from '@/layouts/AdminLayout';
import DefaultLayout from '@/layouts/DefaultLayout';
import { getUserFromToken } from '@/libs/utils';
import { Navigate, Outlet } from 'react-router';

interface ProtectedLayoutProps {
    layout: 'admin' | 'public';
}

const ProtectedLayout = ({ layout }: ProtectedLayoutProps) => {
    const user = getUserFromToken();

    if (layout === 'admin') {
        if (!user) return <Navigate to="/login" replace />;
        if (user.role === 'user') return <Navigate to="/user" replace />;
        if (user.role !== 'admin') return <Navigate to="/login" replace />;
    }

    const Layout = layout === 'admin' ? AdminLayout : DefaultLayout;

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default ProtectedLayout;
