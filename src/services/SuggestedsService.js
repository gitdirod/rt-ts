import useSWR from 'swr';
import { fetchData, swrConfig} from '/src/utils/fetchData';
import BACKEND from '/src/data/backend';
import request from './request';

export const SuggestedsService = {
    fetchById: (id) => request(`${BACKEND.SUGGESTEDS.KEY}/${id}`, 'GET'),
    create: (data) => request(BACKEND.SUGGESTEDS.KEY, 'POST', data),
    update: (id, data) => request(`${BACKEND.SUGGESTEDS.KEY}/${id}`, 'POST', data),
    useAllSuggesteds: () => {
        const url = BACKEND.SUGGESTEDS.KEY;

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