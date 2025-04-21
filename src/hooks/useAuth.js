// useAuth.jsx
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import clienteAxios from "../config/axios";

export const useAuth = ({ middleware, url, urlLogin } = {}) => {
    const navigate = useNavigate();
    
    const [token, setToken] = useState(localStorage.getItem('AUTH_TOKEN'));
    const [isUser, setIsUser] = useState(true);
    const [errores, setErrores] = useState({});
    const [isLoading, setIsLoading] = useState(true); // Estado inicial de carga

    const fetcher = (url) =>
        clienteAxios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.data.data)
            .catch((err) => {
                throw err; // Lanzar el error para que useSWR lo capture
            });

    const { data: user, error, mutate: userMutate } = useSWR(
        token ? '/api/user' : null,
        fetcher,
        {
            shouldRetryOnError: false,
            onError: (error) => {
                if (error?.response?.status === 401) {
                    handleUnauthorized();
                }
            },
        }
    );

    const handleUnauthorized = () => {
        setIsUser(false);
        localStorage.removeItem('AUTH_TOKEN');
        setToken(null);
        navigate(url);
    };

    useEffect(() => {
        if (user || error) {
            setIsLoading(false);
        }
    }, [user, error]);

    useEffect(() => {
        if (!token) {
            setIsLoading(false);
        }
    }, [token]);
    


    const login = async (datos) => {
        try {
            const { data } = await clienteAxios.post('/api/login', datos);
            localStorage.setItem('AUTH_TOKEN', data.token);
            localStorage.setItem('USER_ROLE', data.user.role);
            setErrores({});
            setIsUser(true);
            await userMutate(); // Refresh user data
            if(urlLogin)
            {navigate(urlLogin)}
        } catch (error) {
            setErrores(error.response.data.errors);
        }
    };

    const register = async (datos) => {
        try {
            const { data } = await clienteAxios.post('/api/register', datos);
            localStorage.setItem('AUTH_TOKEN', data.token);
            localStorage.setItem('USER_ROLE', data.user.role);
            setErrores({});
            setIsUser(true);
            userMutate(); // Refresh user data
            navigate('/admin/inventory/products'); // Redirect after registration
        } catch (error) {
            setErrores(error.response.data.errors);
        }
    };

    const logout = async () => {
        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem('AUTH_TOKEN');
            localStorage.removeItem('USER_ROLE');
            // localStorage.removeItem('productsCart');
            userMutate(undefined, false); // Clear user data
            navigate(url); // Redirect after logout
        } catch (error) {
            // handle error
        }
    };

    useEffect(() => {
       
        if (middleware === 'guest' && url && user) {
            navigate(url);
        }
        if (middleware === 'auth' && !token) {
            navigate(url); // Si no hay token, redirigir directamente
        }
        if (middleware === 'auth' && error) {
            navigate(url); // Si hay error, redirigir
        }
        if (middleware === 'admin' && !token) {
            navigate(url); // Si no hay token, redirigir directamente
        }
        if (middleware === 'admin' && !isLoading) {
            
            if (!token || !user) {
                handleUnauthorized()
            } else if (user.role !== 'admin' && url) {
                
                handleUnauthorized()
            }
        }
    }, [user, error, token, middleware, navigate, url, isLoading]);
    

    return {
        login,
        register,
        logout,
        user,
        isUser,
        isAuth: !!user,
        isLoading,
        loading: !user && !error,
        isAdmin: user?.role === 'admin',
        error,
        errores,
        userMutate,
    };
};
