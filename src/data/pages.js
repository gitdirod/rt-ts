export const adminNavigation = [
    {
      id: 1,
      name: "Inventario bodega",
      icon: "iconStock",
      urlMain: "/admin/inventory",
      children: [
        { id: 1, name: "Productos", url: "/admin/inventory/products" },
        { id: 2, name: "Grupos & Categorías", url: "/admin/inventory/groups" },
        { id: 3, name: "Tipo de Producto", url: "/admin/inventory/type" },
        // { id: 12, name: "Resumen existencias", url: "/admin/inventory/stock" },
      ],
    },
    {
      id: 2,
      name: "Ventas cliente",
      icon: "iconEnvoice",
      urlMain: "/admin/order",
      children: [
        { id: 11, name: "Prefacturas", url: "/admin/orders/orders" },
      ],
    },
    {
      id: 3,
      name: "Compras proveedores",
      icon: "iconCart",
      urlMain: "/admin/purchases",
      children: [
        { id: 9, name: "Compras", url: "/admin/purchases/purchases" },
        { id: 10, name: "Nueva compra", url: "/admin/purchases/storePurchase" },
      ],
    },
    {
      id: 4,
      name: "Usuarios",
      icon: "iconUsers",
      urlMain: "/admin/users",
      children: [
        { id: 8, name: "Usuarios", url: "/admin/users/users" },
      ], // Agrega hijos si los necesitas después
    },
    {
      id: 5,
      name: "Página",
      icon: "iconPage",
      urlMain: "/admin/settings",
      children: [
        
        
        // { id: 4, name: "Ajustes adicionales", url: "/admin/settings/more" },
        { id: 5, name: "Landing", url: "/admin/settings/landing" },
        { id: 6, name: "Productos sugeridos", url: "/admin/settings/suggested" },
        { id: 7, name: "Memorias", url: "/admin/settings/memories" },
      ],
    },
  ];
  