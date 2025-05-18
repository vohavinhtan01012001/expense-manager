import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import User from '@/pages/User';

export interface Route {
  path?: string
  element: React.ReactNode
  layout: 'admin' | 'public'
  children?: Route[]
}


export const routes: Route[] = [
  {
    path: '',
    element: <Home />,
    layout: 'admin'
  },
  {
    path: '/login',
    element: <Login />,
    layout: 'public'
  },
  {
    path: '/register',
    element: <Register />,
    layout: 'public'
  },
    {
    path: '/user',
    element: <User />,
    layout: 'admin'
  },
]
