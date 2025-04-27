import {createBrowserRouter, Outlet, Navigate } from 'react-router-dom'

// Vista consumidor
import AuthLayout from './layout/AuthLayout'
import StoreLayout from './layout/StoreLayout'
import Cart from './views/store/cart/Cart'
import Index from './views/Index'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import User from './views/store/user/User'


//  Vista Administrador
import ErrorView from "/src/views/ErrorView"


import AdminLayout from './layout/AdminLayout'
import IndexSoldOrder from './views/admin/IndexSoldOrder'
import IndexGroup from './views/admin/IndexGroup'
import IndexType from '/src/views/admin/IndexType'
import IndexLanding from '/src/views/admin/IndexLanding'
import IndexSuggested from '/src/views/admin/IndexSuggested'
import IndexPurchaseOrder from "/src/views/admin/IndexPurchaseOrder"


import StorePurchaseOrder from '/src/views/admin/StorePurchaseOrder'

import ShowSoldOrder,{
    loader as loaderSoldOrder
} from './views/admin/ShowSoldOrder'

import UpdatePurchaseOrder,{
    loader as loaderPurchase
} from '/src/views/admin/UpdatePurchaseOrder'

import IndexUser from '/src/views/admin/IndexUser'




import Bought from '/src/views/store/bought/Bought'
import ProductDetailPage from '/src/views/store/product/ProductDetailPage'
import ViewProducts from '/src/views/store/product/ViewProducts'
import Likes from '/src/views/store/likes/Likes'
import BoughtDetailPage from '/src/views/store/bought/BoughtDetailPage'
import IndexMemory from '/src/views/admin/IndexMemory'
import ProductPage from '/src/components/admin/product/ProductPage'



const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/store" replace />,
        index: true
    },

    {
        path:'/store',
        element: <StoreLayout />,
        errorElement: <ErrorView/>,
        children:[
            {
                index:true,
                element: <Index />
            },
            {
                path:"/store/products/",
                element: <ViewProducts/>
            },
            {
                path:"/store/product/:id",
                element: <ProductDetailPage />,
            },
            {
                path:"/store/cart/",
                element: <Cart />,
            },
            {
                path:"/store/user/",
                element:<User/>,
            },
            {
                path:"/store/bought/",
                element:<Bought/>,
            },
            {
                path: "/store/bought/:id",
                element: <BoughtDetailPage />,
            },
            {
                path:"/store/likes/",
                element:<Likes/>,
            }
            
        ]
    },
    
    {
        path:'/auth',
        element: <AuthLayout />,
        children:[
            {
                path:'/auth/login',
                element: <Login />
            },
            {
                path:'/auth/registro',
                element: <Register />
            }
        ]
    },
    {
        path:'/admin',
        element: <AdminLayout />,
        children:[
            {
                path:'/admin/inventory',
                element: <Outlet/>,
                children: [
                    {
                        path:'/admin/inventory/products',
                        element: <ProductPage />
                    },
                    {
                        path:'/admin/inventory/groups',
                        element: <IndexGroup />
                    },
                    {
                        path:'/admin/inventory/type',
                        element: <IndexType />
                    }
                    
                ]
            },
            {
                path:'/admin/purchases',
                element: <Outlet />,
                children: [
                    {
                        path : "/admin/purchases/purchases",
                        element: <IndexPurchaseOrder/>
                    },
                    {
                        path : "/admin/purchases/Storepurchase",
                        element: <StorePurchaseOrder/>
                    },
                    {
                        path: "/admin/purchases/purchases/purchase/:itemId",
                        loader: loaderPurchase,
                        element: <UpdatePurchaseOrder/>
                    },
                ]
            },
            {
                path:'/admin/orders',
                element: <Outlet />,
                children: [
                    {
                        path : "/admin/orders/orders",
                        element: <IndexSoldOrder/>
                    },
                    {
                        path: "/admin/orders/orders/item/:itemId",
                        loader: loaderSoldOrder,
                        element: <ShowSoldOrder />
                    },
                ]
            },
            {
                path:'/admin/users',
                element: <Outlet />,
                children: [
                    {
                        path : "/admin/users/users",
                        element: <IndexUser />,
                    },
                ]
            },
            {
                path:'/admin/settings',
                element: <Outlet />,
                children: [
                    
                    {
                        path:'/admin/settings/landing',
                        element: <IndexLanding />
                    },
                    {
                        path:'/admin/settings/suggested',
                        element: <IndexSuggested />
                    },
                    {
                        path:'/admin/settings/memories',
                        element: <IndexMemory />
                    },
                ]
            },
        ]
    },

    
],
{
    future: {
        v7_startTransition: true, // Habilita el uso de startTransition
        v7_relativeSplatPath: true, // Mejora manejo de rutas relativas con splats
        v7_fetcherPersist: true,    // Persiste datos de fetchers entre cambios
        v7_normalizeFormMethod: true, // Normaliza métodos en formularios
    },
}
)

export default router