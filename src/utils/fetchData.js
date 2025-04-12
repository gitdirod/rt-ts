// src/utils/fetchData.js
import clienteAxios from '/src/config/axios';

export const fetchData = async (url) => {
    try {
        const response = await clienteAxios.get(url);
        return response.data;
    } catch (err) {
        console.error(`Error al obtener los datos desde ${url}:`, err);
        // Retornar un objeto vacío o un valor predeterminado en caso de error
        return { data: [], meta: { total: 0 } };
    }
};

export const swrConfig = {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
}