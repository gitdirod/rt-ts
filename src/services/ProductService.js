import useSWR from 'swr';
import { fetchData, swrConfig} from '/src/utils/fetchData';
import BACKEND from '/src/data/backend';
import request from './request';

export const ProductService = {
    fetchById: (id) => request(`${BACKEND.PRODUCTS.KEY}/${id}`, 'GET'),
    create: (data) => request(BACKEND.PRODUCTS.KEY, 'POST', data),
    update: (id, data) => request(`${BACKEND.PRODUCTS.KEY}/${id}`, 'POST', data),
    useProducts: ({ page, perPage, name, code, group_id, categories, types, sortField, sortOrder }) => {
        const params = { page, perPage, name, code, group_id, categories, types, sortField, sortOrder };
      
        const { data, error, mutate } = useSWR(
          [BACKEND.PRODUCTS_SEARCH.KEY, params],  // << importante, pasas [url, body] como key
          ([url, body]) => request(url, 'POST', body),  // SWR manda post con body
          swrConfig
        );
      
        return {
          data: data?.data?.data || [],
          totalRecords: data?.data?.meta?.total || 0,
          loading: !data && !error,
          error,
          mutate
        };
      }
    , 
    // useProducts: ({ page, perPage, name, code, group_id, categories, types, sortField, sortOrder }) => {
    //     // Construcción de la URL con los parámetros
    //     const url = `${BACKEND.PRODUCTS.KEY}?page=${page}&perPage=${perPage}&name=${name}&code=${code}&group_id=${group_id}&categories=${categories}&types=${types}&sortField=${sortField}&sortOrder=${sortOrder}`;

    //     // Uso de SWR para obtener productos
    //     const { data, error, mutate } = useSWR(
    //         url,
    //         fetchData,
    //         swrConfig
    //     );

    //     // Retornar los datos y funciones de SWR
    //     return {
    //         data: data?.data || [],
    //         totalRecords: data?.meta?.total || 0,
    //         loading: !data && !error,
    //         error,
    //         mutate
    //     };
    // },     
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
