import useSWR from 'swr';
import { fetchData, swrConfig} from '/src/utils/fetchData';
import BACKEND from '/src/data/backend';
import request from './request';

export const TypeService = {

    fetchById: (id) => request(`${BACKEND.TYPE_PRODUCT.KEY}/${id}`, 'GET'),
    create: (data) => request(BACKEND.TYPE_PRODUCT.KEY, 'POST', data),
    update: (id, data) => request(`${BACKEND.TYPE_PRODUCT.KEY}/${id}`, 'POST', data),
    useAllTypes: (enabled = false) => {
        const url = enabled ? BACKEND.TYPE_PRODUCT.KEY : null;
        console.log(url)

        // Uso de SWR con fetchData como fetcher
        const { data, error, mutate } = useSWR(
            url,
            fetchData, // Usando la función genérica
            swrConfig
        );

        return {
            data: data?.data || [],
            totalRecords: data?.meta?.total || 0,
            loading: !data && !error,
            error,
            mutate
        };
    }
};