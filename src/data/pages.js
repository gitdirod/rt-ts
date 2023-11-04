const storeViews = [
    {
        name: "Inventario bodega",
        id:1,
        image: "iconStock",
        url: "/admin/inventory/products",
        urlMain:"/admin/inventory"
    },
    {
        name: "Ventas cliente",
        id:2,
        image: "iconEnvoice",
        url: "/admin/orders/orders",
        urlMain:"/admin/order"
    },
    {
        name: "Compras proveedores",
        id:3,
        image: "iconCart",
        url: "/admin/purchases/purchases",
        urlMain:"/admin/purchases"

    },
    {
        name: "Usuarios",
        id:4,
        image: "iconUsers",
        url: "/admin/users",
        urlMain:"/admin/users"
    },
    {
        name: "Pagina",
        id:5,
        image: "iconPage",
        url: "/admin/settings/groups",
        urlMain:"/admin/settings"
    },

    

]
const adminViews = [
    {
        name: "Productos",
        id:1,
        page_id:1,
        url: "/admin/inventory/products",
        block: 'product'
    },
    {
        name: "Nuevo Producto",
        id:2,
        page_id:1,
        url: "/admin/inventory/storeProduct",
        block: 'product'

    },
    {
        name: "Grupos & Categorías",
        id:3,
        page_id:5,
        url: "/admin/settings/groups",
        block: 'settings'

    },
    {
        name: "Tipo de Producto",
        id:4,
        page_id:5,
        url: "/admin/settings/type",
        block: 'settings'

    },
    {
        name: "Ajustes adicionales",
        id:5,
        page_id:5,
        url: "/admin/settings/more",
        block: 'settings'

    },
    {
        name: "Landing",
        id:6,
        page_id:5,
        url: "/admin/settings/landing",
        block: 'settings'

    },
    {
        name: "Productos sujeridos",
        id:7,
        page_id:5,
        url: "/admin/settings/suggested",
        block: 'settings'

    },
    {
        name: "Comentarios",
        id:8,
        page_id:5,
        url: "/admin/settings/comments",
        block: 'settings'

    },


    {
        name: "Compras",
        id:9,
        page_id:3,
        url: "/admin/purchases/purchases",
        block: 'purchases'

    },
    {
        name: "Nueva compra",
        id:10,
        page_id:3,
        url: "/admin/purchases/storePurchase",
        block: 'purchases'

    },
    {
        name: "Prefacturas",
        id:11,
        page_id:2,
        url: "/admin/orders/orders",
        block: 'orders'

    },
    {
        name: "Resumen existencias",
        id:12,
        page_id:1,
        url: "/admin/inventory/stock",
        block: 'product'
    }
]

const views =[
    {
        id: 1,
        name:"Gestor",
        url:"/admin/inventory/products",
        blockUrl:"/admin",
        icon:"config"
    },
    {
        id: 2,
        name:"Tienda",
        url:"/store/",
        blockUrl:"/store",
        icon:"shop"
    },
    {
        id: 3,
        name:"Vendedor",
        url:"/seller/inventory/products/",
        blockUrl:"/seller",
        icon:"sellerMan"
    },
]

export {
    storeViews,
    adminViews,
    views
}