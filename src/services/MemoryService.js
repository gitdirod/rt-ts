import useSWR from 'swr';
import { fetchData, swrConfig} from '/src/utils/fetchData';
import BACKEND from '/src/data/backend';
import request from './request';

export const MemoryService = {
    fetchById: (id) => request(`${BACKEND.MEMORIES.KEY}/${id}`, 'GET'),
    create: (data) => request(BACKEND.MEMORIES.KEY, 'POST', data),
    update: (id, data) => request(`${BACKEND.MEMORIES.KEY}/${id}`, 'POST', data),
    useAllMemories: () => {
        const url = BACKEND.MEMORIES.KEY;

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