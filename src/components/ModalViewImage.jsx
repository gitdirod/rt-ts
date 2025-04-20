import { 
    memo, 
    useEffect,
    useState
} from "react"

import IsLoading from "./store/common/IsLoading"
import iconClose from '/src/static/icons/seller/close.svg'
import iconDelete from "/src/static/icons/admin/delete.svg"
import Btn from "./admin/Btn"
import useAdmin from "/src/hooks/useAdmin"
import ModalViewDelete from "./ModalViewDelete"


const ModalViewImage = ({images, index, url, closeModal, canDestroy=false})=> {

    const [indexImage, setIndexImage] = useState(index)
    
    const {
        handleModalViewDelete,
        handleModalStateDelete,
        handleCloseDeleteModal,
        handleCloseImageModal
    } = useAdmin()
    
    useEffect(()=>{
        if(images?.length < indexImage){
            setIndexImage(0)
        }
    },[images])

    if(images?.length === 0){
        return(
            <div className="center-c bg-transparent w-screen h-screen">
                <IsLoading/>
            </div>
        )
    }

    const openModalDelete=(item)=>{
        if(canDestroy){
            handleModalStateDelete(true)
            handleModalViewDelete(<ModalViewDelete item={item} urlDestroy='sold-order-payments' closeModal={handleCloseDeleteModal}/>)
        }
    }

    return (
        <div className="relative flex flex-col justify-center items-center">
            
            <div
                className="relative flex flex-col justify-between items-center w-[calc(100vw-2rem)] md:w-[calc(100vw-4rem)] h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] bg-white rounded-lg overflow-hidden"
            >
                

            

                <div className=" center-r flex-1">
                    
                    <img    
                        className=" h-full object-contain rounded-lg max-h-[calc(100vh-10vh-2rem)] md:max-h-[calc(100vh-10vh-4rem)] p-1"
                        src={url + images[indexImage]['name']}
                        alt="img" 
                    />
                </div>
                <div className="center-r border-t p-1 w-full h-full max-h-[10vh] md:gap-2  bg-white ">
                    {
                        images?.map((img, index)=>(
                            <div
                                key={img.id}
                                onClick={()=>{
                                    setIndexImage(index)
                                }}
                                className="inline-block"
                            >
                                <img 
                                    className=" object-contain w-auto h-[9vh] border border-white select-none cursor-pointer"
                                    src={url + img['name']}
                                    alt="imagen de producto" 
                                />

                                <div className="absolute top-2 right-2 center-r w-full">    
                                    {canDestroy && (
                                        <Btn
                                            style=' bg-red-500  border rounded-lg'
                                            text='Eliminar'
                                            icon={iconDelete}
                                            imageColor
                                            action={()=>{
                                                openModalDelete(img)
                                            }}
                                    />
                                    )}
                                    <Btn
                                        style=' absolute bg-white top-0 right-0 border rounded-lg'
                                        icon={iconClose}
                                        imageColor
                                        action={()=>{
                                            handleCloseImageModal()
                                        }}
                                    />
                                </div>
                            </div>
                        ))  
                    }
                </div>
            </div>
            
        </div>
    )
}

export default memo(ModalViewImage)