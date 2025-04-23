import useSWR from 'swr';
import { fetchData, swrConfig} from '/src/utils/fetchData';
import BACKEND from '/src/data/backend';

export const ProductService = {
    useProducts: ({ page, perPage, name, code, group_id, categories, types, sortField, sortOrder }) => {
        // Construcción de la URL con los parámetros
        const url = `${BACKEND.PRODUCTS.KEY}?page=${page}&perPage=${perPage}&name=${name}&code=${code}&group_id=${group_id}&categories=${categories}&types=${types}&sortField=${sortField}&sortOrder=${sortOrder}`;

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
    usePublicProducts: ({ page, perPage, name, code, group_id, categories, types, sortField, sortOrder }) => {
        // Construcción de la URL con los parámetros
        const url = `${BACKEND.PUBLIC_PRODUCTS.KEY}?page=${page}&perPage=${perPage}&name=${name}&code=${code}&group_id=${group_id}&categories=${categories}&types=${types}&sortField=${sortField}&sortOrder=${sortOrder}`;

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

};
