import useSWR from 'swr';
import { fetchData, swrConfig} from '/src/utils/fetchData';
import BACKEND from '/src/data/backend';
import request from './request';

export const SuggestionsService = {
    fetchById: (id) => request(`${BACKEND.SUGGESTIONS.KEY}/${id}`, 'GET'),
    create: (data) => request(BACKEND.SUGGESTIONS.KEY, 'POST', data),
    update: (id, data) => request(`${BACKEND.SUGGESTIONS.KEY}/${id}`, 'POST', data),
    useAllSuggestions: () => {
        const url = BACKEND.SUGGESTIONS.KEY;

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