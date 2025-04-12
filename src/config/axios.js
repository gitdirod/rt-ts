import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'multipart/form-data'
    },
    withCredentials: true,
});

// Interceptor para agregar el token en cada solicitud
clienteAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default clienteAxios;
