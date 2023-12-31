import { createContext, useCallback, memo, useState, useRef } from "react";
import clienteAxios from "/src/config/axios"
import { toast } from "react-toastify"

const AdminContext = createContext();

const AdminProvider = memo(({children}) =>{

    const [categoryAdmin, setCategoryAdmin] = useState({})
    const [groupAdmin, setGroupAdmin] = useState({})
    const [orderAdmin, setOrderAdmin] = useState({})

    const [suggestion, setSuggestion] = useState({})
    
    const [customerCcruc, setCustomerCcruc] = useState(localStorage.getItem('storageCustomerCcruc')===null ? "" :JSON.parse(localStorage.getItem('storageCustomerCcruc')) )

    const [modalViewComponent, setModalViewComponent] = useState('')
    const [modalStateComponent, setModalStateComponent] = useState(false)

    const [modalViewImage, setModalViewImage] = useState('')
    const [modalStateImage, setModalStateImage] = useState(false)

    const [modalViewDelete, setModalViewDelete] = useState('')
    const [modalStateDelete, setModalStateDelete] = useState(false)

    const [modalViewRequest, setModalViewRequest] = useState('')
    const [modalStateRequest, setModalStateRequest] = useState(false)
            

    const token = localStorage.getItem('AUTH_TOKEN')
    const toastMessage = (message)=>{
        toast.success(<span className="w-full font-poppins-regular">{message}</span>,{
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            // theme: "colored",
        })
    }
    const emailVerification = async (url, setErrores,setState, setWaiting) =>{
        setWaiting(true)
        try{
            const {data} = await clienteAxios.post('/api/' + url)
            toastMessage(data.message)
            setState(data.state)
            setWaiting(false)
            setErrores({})
        }catch(error){

            setErrores(error.response)
            setWaiting(false)
        }
    }
    const show = async (url, id , setStorage ,setErrores,setState, setWaiting) =>{
        setWaiting(true)
        try{
            const {data} = await clienteAxios.get('/api/' + url +'/'+ id, sendData)
            setStorage(data)
            toastMessage(data.message)
            setState(data.state)
            setWaiting(false)
            setErrores({})
        }catch(error){
            setErrores(error.response.data.errors)
            setWaiting(false)
        }
    }
    const create = async (url, sendData , setErrores,setState, setWaiting) =>{
        
        setWaiting(true)
        try{
            const {data} = await clienteAxios.post('/api/' + url , sendData, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            toastMessage(data.message)
            setState(data.state)
            setWaiting(false)
            setErrores({})
        }catch(error){
            setErrores(error.response.data.errors)
            setWaiting(false)
        }
    }
    const update = async (url, sendData , setErrores,setState, setWaiting) =>{
        setWaiting(true)
        try{
            const {data} = await clienteAxios.post('/api/' + url +'/'+sendData.id, sendData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            toastMessage(data.message)
            setState(data.state)
            setWaiting(false)
            setErrores({})
        }catch(error){
            setErrores(error.response.data.errors)
            setWaiting(false)
        }
    }
    const destroy = async (url, sendData , setErrores, setState, setWaiting) =>{
        setWaiting(true)
        try{
            const {data} = await clienteAxios.delete('/api/' + url +'/'+ sendData.id, sendData)
            toastMessage(data.message)
            setState(data.state)
            setWaiting(false)
            setErrores({})
        }catch(error){
            setErrores(error.response.data.errors)
            setWaiting(false)
        }
    }

    
    const refGroupId = useRef()
    const handleGetGroup = (group_id, update = false)=>{
        if(refGroupId.current !== group_id || update){
            getGroup(group_id)
            refGroupId.current = group_id
        }
    }
    const getGroup = async (group_id) =>{
        try{
            const {data} = await clienteAxios.get(`/api/groups/${group_id}`)
            setGroupAdmin(data)
        }catch(error){
            
        }
    }

    const refOrderId = useRef()
    const handleGetOrder = (order_id, update = false)=>{
        if(refOrderId.current !== order_id || update){
            getOrder(order_id)
            refOrderId.current = order_id
        }
    }
    const getOrder = async (order_id) =>{
        try{
            const {data} = await clienteAxios.get(`/api/orders/${order_id}`)
            setOrderAdmin(data)
        }catch(error){
            
        }
    }

    const refCategoryId = useRef()
    const handleGetCategory = useCallback((category_id, update = false)=>{
        if(refCategoryId.current !== category_id || update){
            getCategory(category_id)
            refCategoryId.current = category_id
        }
    }, [categoryAdmin.id])
    const getCategory = async (category_id) =>{
        try{
            const {data} = await clienteAxios.get(`/api/categories/${category_id}`)
            setCategoryAdmin(data)
        }catch(error){
            
        }
    }
    
    const handleSetSuggestion =(item)=>{
        setSuggestion(item)
    }

    const handleModalViewComponent=(block)=>{
        setModalViewComponent(block)
    }

    const handleModalStateComponent =(state)=>{
        setModalStateComponent(state)
    }

    const handleModalStateImage =(state)=>{
        setModalStateImage(state)
    }
    const handleModalViewImage=(block)=>{
        setModalViewImage(block)
    }
    const handleModalStateDelete =(state)=>{
        setModalStateDelete(state)
    }
    const handleModalViewDelete=(block)=>{
        setModalViewDelete(block)
    }
    const handleModalStateRequest =(state)=>{
        setModalStateRequest(state)
    }
    const handleModalViewRequest=(block)=>{
        setModalViewRequest(block)
    }


    const handleCloseModals=()=>{
        handleModalStateComponent(false) 
        handleModalStateImage(false) 
        handleModalStateDelete(false) 
        handleModalStateRequest(false) 
    }
    const handleCloseDeleteModal=()=>{
        handleModalStateDelete(false) 
    }
    const handleCloseImageModal=()=>{
        handleModalStateImage(false) 
    }

    const handleSetCustomerCcruc = (value)=>{
        setCustomerCcruc(value)
        localStorage.setItem('storageCustomerCcruc', JSON.stringify(value))
    }

    const handleClearCustomerCcruc = ()=>{
        setCustomerCcruc('')
        localStorage.setItem('storageCustomerCcruc', JSON.stringify(''))
    }

    return(
        <AdminContext.Provider
            value={{
                emailVerification,
                show,
                create,
                update,
                destroy,

                categoryAdmin,
                groupAdmin,
                orderAdmin,
                suggestion,
                
                handleGetCategory,
                handleGetGroup,
                handleGetOrder,
                
                handleSetSuggestion,
                
                setCategoryAdmin,
                setGroupAdmin,
                setOrderAdmin,

                handleModalStateComponent,
                handleModalViewComponent,
                modalViewComponent,
                modalStateComponent,
                
                handleModalStateImage,
                handleModalViewImage,
                modalViewImage,
                modalStateImage,
                
                handleModalViewDelete,
                handleModalStateDelete,
                modalViewDelete,
                modalStateDelete,

                handleModalViewRequest,
                handleModalStateRequest,
                modalViewRequest,
                modalStateRequest,
                
                handleCloseModals,
                handleCloseDeleteModal,
                handleCloseImageModal,

                customerCcruc,
                handleSetCustomerCcruc,
                handleClearCustomerCcruc,

            }}
        >
            {children}
        </AdminContext.Provider>
    )   
})

export {
    AdminProvider
}
export default AdminContext