// export default BACKEND;
const createEndpoint = (endpoint) => ({
    URL: `${import.meta.env.VITE_API_URL}/${endpoint}/`,
    KEY: `api/${endpoint}`
});

const BACKEND = {
    ADS: createEndpoint('ads_youtube'),
    ADDRESSES: createEndpoint('addresses'),
    USERS: createEndpoint('users'),
    CATEGORIES: createEndpoint('categories'),
    CATEGORIES_ALL: createEndpoint('categories_all'),
    GROUPS: createEndpoint('groups'),
    ICONS: createEndpoint('iconos'),
    MEMORIES: createEndpoint('memories'),
    LANDING: createEndpoint('landings'),
    SUGGESTIONS: createEndpoint('suggestions'),
    SUGGESTEDS: createEndpoint('suggesteds'),
    SIZES: createEndpoint('sizes'),
    SIZES_ALL: createEndpoint('sizes_all'),
    NUMBERS: createEndpoint('number_colors'),
    NUMBERS_ALL: createEndpoint('number_colors_all'),
    PRODUCTS: createEndpoint('products'),
    PUBLIC_PRODUCTS: createEndpoint('public-products'),
    BULK_PRODUCTS: createEndpoint('bulk_products'),
    NO_SUGGESTED_PRODUCTS: createEndpoint('no-suggested-products'),
    TAXES: createEndpoint('taxes'),
    TYPE_PRODUCT: createEndpoint('type_products'),
    TYPE_PRODUCT_ALL: createEndpoint('type_products_all'),
    PURCHASE_ORDERS: createEndpoint('purchase_orders'),
    SOLD_ORDERS: createEndpoint('sold_orders'),
    SOLD_ORDERS_IMAGE_PAYMENT: createEndpoint('sold_order_payment_image'),
};

export default BACKEND;


