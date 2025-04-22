import useSWR from 'swr';
import { fetchData, swrConfig} from '/src/utils/fetchData';
import BACKEND from '/src/data/backend';

export const SoldOrderService = {
    
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
    }
};