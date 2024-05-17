import { 
    memo, 
    useEffect,
    useState
} from "react"

import useStore from "/src/hooks/useStore"
import useAdmin from "/src/hooks/useAdmin"
import Btn from "./admin/Btn"
import ModalViewRequest from "./admin/ModalViewRequest"
import iconClose from '/src/static/icons/close.svg'
import iconDelete from "/src/static/icons/admin/delete.svg"
import iconDeleteBlack from "/src/static/icons/delete_filled.svg"

const ModalViewDelete=({closeModal, item, urlDestroy})=> {

    const {
        handleModalViewRequest,
        handleModalStateRequest,
        destroy,
        handleCloseDeleteModal,
         
    } = useAdmin()
    const {mutateSoldOrders} = useStore()

    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [errores, setErrores] = useState({})

    const handleSubmit = async e =>{
        e.preventDefault()
        const itemToDelete = {
          _method: 'DELETE',
          id: item.id,
        }
        if(!waiting){
            destroy(urlDestroy, itemToDelete, setErrores, setState, setWaiting)
        }
    }
    useEffect(()=>{
        if(state){
            mutateSoldOrders()
            setState(false)
            handleCloseDeleteModal()
            
        }
        handleModalViewRequest(<ModalViewRequest text="Eliminando..." icon={iconDeleteBlack} spin={false}/>)
        handleModalStateRequest(waiting)
    },[waiting])

    return (
        <div className="center-r w-full h-full">
            <div className="center-c flex-wrap gap-2 bg-white p-4 rounded-lg text-slate-700">
                <div className="center-c text-center">
                    <img src={iconDelete} className="w-24" alt="" />
                    <span className="font-poppins-extrabold">¿Seguro deseas eliminar?</span>
                    <span className="font-poppins-regular ">Los datos eliminados no podrán ser recuperados</span>
                </div>
                <form 
                    className="center-r gap-2"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <Btn
                        style=' bg-slate-700  border rounded-lg'
                        text='Cancelar'
                        icon={iconClose}
                        isButton={false}
                        imageColor='white'
                        action={()=>{
                            handleCloseDeleteModal()
                        }}
                    />
                    <Btn
                        style=' bg-red-500  border rounded-lg'
                        text='Eliminar'
                        icon={iconDelete}
                        imageColor
                        // action={()=>{
                        //     closeModal()
                        // }}
                    />
                </form>
            </div>
        </div>
    )
}
export default memo(ModalViewDelete)

