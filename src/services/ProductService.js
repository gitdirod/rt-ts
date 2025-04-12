import useSWR from 'swr';
import { fetchData, swrConfig} from '/src/utils/fetchData';
import BACKEND from '/src/data/backend';

export const ProductService = {
    useProducts: ({ page, perPage, name, code, categories, types, sortField, sortOrder }) => {
        // Construcción de la URL con los parámetros
        const url = `${BACKEND.PRODUCTS.KEY}?page=${page}&perPage=${perPage}&name=${name}&code=${code}&categories=${categories}&types=${types}&sortField=${sortField}&sortOrder=${sortOrder}`;

        // Uso de SWR para obtener productos
        const { data, error, mutate } = useSWR(
            url,
            fetchData,
            swrConfig
        );

        // Retornar los datos y funciones de SWR
        return {
            data: data?.data || [],
            totalRecords: data?.meta?.total || 0,
            loading: !data && !error,
            error,
            mutate
        };
    },
    useNoSuggestedProducts: ({ page, perPage, name, code, sortField, sortOrder }) => {
        // Construcción de la URL con los parámetros
        const url = `${BACKEND.NO_SUGGESTED_PRODUCTS.KEY}?page=${page}&perPage=${perPage}&name=${name}&code=${code}&sortField=${sortField}&sortOrder=${sortOrder}`;

        // Uso de SWR para obtener productos
        const { data, error, mutate } = useSWR(
            url,
            fetchData,
            swrConfig
        );

        // Retornar los datos y funciones de SWR
        return {
            data: data?.data || [],
            totalRecords: data?.meta?.total || 0,
            loading: !data && !error,
            error,
            mutate
        };
    },
    // checkExistingProducts: async (codes) => {
    //     const { create } = useAdmin(); // Acceder al método `create` desde el contexto de Admin

    //     try {
    //         const response = await create(`${BACKEND.PRODUCTS.KEY}/check`, { codes });

    //         if (response.success) {
    //             return {
    //                 success: true,
    //                 data: response.data
    //             };
    //         } else {
    //             return {
    //                 success: false,
    //                 errors: response.errors
    //             };
    //         }
    //     } catch (error) {
    //         console.error("Error checking existing products:", error);
    //         return {
    //             success: false,
    //             errors: error.response?.data?.errors || {}
    //         };
    //     }
    // }
};
