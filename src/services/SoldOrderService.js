import useSWR from 'swr';
import { fetchData, swrConfig} from '/src/utils/fetchData';
import BACKEND from '/src/data/backend';
import request from './request';

export const SoldOrderService = {
    fetchById: (id) => request(`${BACKEND.SOLD_ORDERS.KEY}/${id}`, 'GET'),
    create: (data) => request(BACKEND.SOLD_ORDERS.KEY, 'POST', data),
    update: (id, data) => request(`${BACKEND.SOLD_ORDERS.KEY}/${id}`, 'POST', data),
    useAllSoldOrders: () => {
        const url = BACKEND.SOLD_ORDERS.KEY;

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
    },
    useSoldOrderById: (id) => {
        const url = `${BACKEND.SOLD_ORDERS.KEY}/${id}`;

        const { data, error, mutate } = useSWR(
            id ? url : null, // evita llamada si id es null/undefined
            fetchData,
            swrConfig
        );

        return {
            data: data?.data || null,
            loading: !data && !error,
            error,
            mutate
        };
    }
};