import {createBrowserRouter, Outlet, Navigate } from 'react-router-dom'

// Vista consumidor
import AuthLayout from './layout/AuthLayout'
import StoreLayout from './layout/StoreLayout'
import Cart from './views/Cart'
import Index from './views/Index'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import User from './views/User'
import Bought from './views/Bought'
import Likes from './views/Likes'

//  Vista Administrador
import AdminLayout from './layout/AdminLayout'
import ErrorView from "/src/views/ErrorView"

import IndexProduct from './views/admin/IndexProduct'
import IndexSoldOrder from './views/admin/IndexSoldOrder'
import IndexGroup from './views/admin/IndexGroup'
import IndexType from '/src/views/admin/IndexType'
import IndexMore from '/src/views/admin/IndexMore'
import IndexLanding from '/src/views/admin/IndexLanding'
import IndexSuggested from '/src/views/admin/IndexSuggested'
import IndexComments from '/src/views/admin/IndexComments'
import IndexPurchaseOrder from "/src/views/admin/IndexPurchaseOrder"
import IndexStock from "/src/views/admin/IndexStock"

import StorePurchaseOrder from '/src/views/admin/StorePurchaseOrder'
import StoreProduct from './views/admin/StoreProduct'


import ShowProduct,{
    loader as loaderItem
} from './views/admin/ShowProduct'

import ShowSoldOrder,{
    loader as loaderSoldOrder
} from './views/admin/ShowSoldOrder'
import ShowStock,{
    loader as loaderStock
} from './views/admin/ShowStock'

import UpdatePurchaseOrder,{
    loader as loaderPurchase
} from '/src/views/admin/UpdatePurchaseOrder'

import UpdateProduct,{
    loader as loaderEditItem
} from './views/admin/UpdateProduct'
import ShowProductCustomer from '/src/views/ShowProductCustomer'
import IndexUser from '/src/views/admin/IndexUser'




import ViewProducts from '/src/views/customerView/ViewProducts'
import IndexProductNew from '/src/views/admin/indexProductNew'






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
                path:"/store/product/:productName",
                element: <ShowProductCustomer />,
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
                        element: <IndexProduct />
                    },
                    {
                        path:'/admin/inventory/productsNew',
                        element: <IndexProductNew />
                    },
                    {
                        path : "/admin/inventory/products/item/:itemId",
                        loader: loaderItem,
                        element: <ShowProduct />
                    },
                    {
                        path : "/admin/inventory/products/item/edit/:itemId",
                        loader: loaderEditItem,
                        element: <UpdateProduct />
                    },
                    {
                        path:'/admin/inventory/storeProduct',
                        element: <StoreProduct />
                    },
                    {
                        path:'/admin/inventory/stock',
                        element: <IndexStock/>
                    },
                    {
                        path : "/admin/inventory/stock/product/:itemId",
                        loader: loaderStock,
                        element: <ShowStock />
                    },
                    
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
                        index:true,
                        element: <IndexUser />,
                    },
                ]
            },
            {
                path:'/admin/settings',
                element: <Outlet />,
                children: [
                    {
                        path:'/admin/settings/groups',
                        element: <IndexGroup />
                    },
                    {
                        path:'/admin/settings/type',
                        element: <IndexType />
                    },
                    {
                        path:'/admin/settings/more',
                        element: <IndexMore />
                    },
                    {
                        path:'/admin/settings/landing',
                        element: <IndexLanding />
                    },
                    {
                        path:'/admin/settings/suggested',
                        element: <IndexSuggested />
                    },
                    {
                        path:'/admin/settings/comments',
                        element: <IndexComments />
                    },
                ]
            },
        ]
    },

    
])

export default router