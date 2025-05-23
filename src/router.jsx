import {createBrowserRouter, Outlet, Navigate } from 'react-router-dom'

import StoreLayout from './layout/StoreLayout'
import Cart from './views/store/cart/Cart'
import Index from './views/Index'
import User from './views/store/user/User'

import Bought from '/src/views/store/bought/Bought'
import ProductDetailPage from '/src/views/store/product/ProductDetailPage'
import ViewProducts from '/src/views/store/product/ViewProducts'
import Likes from '/src/views/store/likes/Likes'
import BoughtDetailPage from '/src/views/store/bought/BoughtDetailPage'

import ErrorView from "/src/views/ErrorView"


import AdminLayout from './layout/AdminLayout'
import IndexGroup from './views/admin/IndexGroup'
import IndexType from '/src/views/admin/IndexType'
import IndexLanding from '/src/views/admin/IndexLanding'
import IndexSuggested from '/src/views/admin/IndexSuggested'
import IndexMemory from '/src/views/admin/IndexMemory'
import ProductPage from '/src/components/admin/product/ProductPage'

import IndexPurchaseOrder from "/src/views/admin/IndexPurchaseOrder"
import StoreUpdatePurchaseOrder from '/src/views/admin/StoreUpdatePurchaseOrder'

import IndexSoldOrder from './views/admin/IndexSoldOrder'
import ShowSoldOrder from './views/admin/ShowSoldOrder'

import IndexUser from '/src/views/admin/IndexUser'





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
                        element: <StoreUpdatePurchaseOrder/>
                    },
                    {
                        path: "/admin/purchases/purchases/purchase/:itemId",
                        element: <StoreUpdatePurchaseOrder/>
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