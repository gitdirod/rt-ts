import useSWR from 'swr';
import { fetchData, swrConfig} from '/src/utils/fetchData';
import BACKEND from '/src/data/backend';
import request from './request';

export const LandingService = {
    fetchById: (id) => request(`${BACKEND.LANDINGS.KEY}/${id}`, 'GET'),
    create: (data) => request(BACKEND.LANDINGS.KEY, 'POST', data),
    update: (id, data) => request(`${BACKEND.LANDINGS.KEY}/${id}`, 'POST', data),
    useAllLandings: (enable = false) => {
        const url = enable ? BACKEND.LANDINGS.KEY : null;

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