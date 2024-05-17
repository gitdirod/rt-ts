import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useNavigate } from 'react-router-dom'
import clienteAxios from "../config/axios"
import { views } from "/src/data/pages"

export const useAuth = ({middleware, url}) => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate()

    const[isUser, setIsUser] = useState(true)
    const[isToken, setIsToken] = useState(token===null?false:true)
    const[errores, setErrores] = useState([])

    const { data: user, error, mutate:userMutate } = useSWR(isToken ? '/api/user': null, () => 
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data.data)
        .catch(error => {
            if(error?.response?.status === 401){
                setIsUser(false)
            }
            throw Error(error?.response?.data?.errors)
        })
    )
    const { data: users, error: usersError, mutate:usersMutate } = useSWR(user?.role === "admin" ? '/api/users': null, () => 
        clienteAxios('/api/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    )


    const login = async (datos, setErrores) =>{
        try {
            const {data} = await clienteAxios.post('/api/login', datos)
            localStorage.setItem('AUTH_TOKEN', data.token)
            setErrores([])
            setIsUser(true)
            window.location.reload(false);
            // await mutate(undefined)
            
        } catch (error) {
            setErrores(error.response.data.errors)
        }
    }
    const register = async (datos, setErrores) =>{
        try {
            const {data} = await clienteAxios.post('/api/register', datos)
            localStorage.setItem('AUTH_TOKEN', data.token)
            setErrores([])
            setIsUser(true)
            window.location.reload(false);
            // await mutate()
        } catch (error) {
            setErrores(error.response.data.errors)
        }
    }
    const logout = async () => {
        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            localStorage.removeItem('productsCart')
            // setClearUser(true)
            navigate('/store')
            window.location.reload(false);
            await mutate(undefined)
        } catch (error) {
            // throw Error(error?.response?.data?.errors)
        }
        window.location.reload(false);
        
    }
    

    useEffect(() => {
        if( middleware === 'guest' && url && user){
            navigate(url)
        }
        if(middleware === 'auth' && error){
            navigate('/auth/login')
        }
        if(middleware === 'admin' && url && user){
            if(user.role !=='admin'){
                navigate(url)
            }
        }
    }, [user, error])

    return {
        login,
        register,
        logout, 
        user,
        error,
        users,
        usersError,
        userMutate,
        usersMutate,
    }
}