import { memo } from "react"
import iconImage from '/src/static/icons/page.svg'
import useAdmin from "/src/hooks/useAdmin"
import ModalViewImage from "/src/components/ModalViewImage"
import { urlsBackend } from "/src/data/urlsBackend"


const ShowBankImages=({order})=> {
    
    const images = order?.payments

    if(images?.length < 1 ) return null
    const {
        handleModalStateImage,
        handleModalViewImage,
        handleCloseModals
    }= useAdmin()

    const openModal=(index)=>{
        handleModalStateImage(true)
        handleModalViewImage(<ModalViewImage canDestroy={true} addDelete={true} images={images} url={urlsBackend.SOLD_ORDER_PAYMENT_IMAGE} index={index} closeModal={handleCloseModals}/>)
    }
    
    return (
        <div className="flex flex-1 flex-wrap">
            <div className="flex  items-center font-bold gap-x-2 text-slate-600">
                <img className="w-5 h-5 grey" src={iconImage} alt="" />
              <h2 className="font-bold">Comprobantes Bancarios:</h2>
            </div>
            <div 
                className="flex justify-start gap-x-1 w-full border rounded-lg bg-white p-1 cursor-pointer"
                
            >
                {
                    images?.map((ima, index)=>(
                        <div key={ima.id}
                            onClick={()=>{
                                openModal(index)
                            }}
                        >
                            <img 
                                className=" h-20 rounded"
                                src={urlsBackend.SOLD_ORDER_PAYMENT_IMAGE + ima?.name} 
                                alt={ima?.name}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
  )
}

export default memo(ShowBankImages)
