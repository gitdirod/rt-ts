import { useState, useEffect, memo } from "react"
import { urlsBackend } from "/src/data/urlsBackend"
import useStore from "/src/hooks/useStore"

import Btn from "/src/components/admin/Btn"

import iconClose from '/src/static/icons/seller/close.svg'

import iconItem from "/src/static/icons/item.svg"

import {formatearDinero} from "/src/helpers/index"
import UnidsAvailable from "./UnidsAvailable"
import BlockHeader from "/src/components/admin/BlockHeader"

import iconClasificacion from '/src/static/icons/clasificacion_color.svg'
import iconEnergy from '/src/static/icons/energy_color.svg'
import size from '/src/static/icons/size.svg'
import weight from '/src/static/icons/weight.svg'
import useAdmin from "/src/hooks/useAdmin"
import ModalViewImage from "/src/components/ModalViewImage"


const ModalViewProductSeller=({product, closeModal})=> {

    const [indexImage, setIndexImage] = useState(0)

    const {
        handleCloseModals,
        handleModalStateImage,
        handleModalViewImage,
      } = useAdmin()

    const productImage = urlsBackend.PRODUCT_IMAGE + product.images[0]?.name
    

    if(Object.keys(product).length === 0){
        return null
    }

    return (
    <div className=" md:flex flex-col w-full font-poppins-extrabold bg-white rounded-lg overflow-hidden p-2">
        
        <BlockHeader
            name={  
                <div className='center-r '>
                  <img src={iconItem} alt="save" className='w-8 h-8 gray pr-2' />
                  {product?.name}
                </div>
                }
                code={product?.code}
                middle={<div className="w-full center-r">{formatearDinero(product?.price)}</div>}
            >
                <Btn
                style='md:absolute bg-white border right-2 '
                icon={iconClose}
                imageColor
                action={()=>{
                    closeModal()
                }}
            />
            </BlockHeader>
        
        <div className=" relative center-c text-slate-700 md:flex-row  max-h-screen    md:gap-x-16 px-1 md:px-10 py-2">
            <UnidsAvailable units={product?.units} textColor="slate-700 sm:absolute md:top-2  md:right-2"/>
            <div className="center-c">
                <div 
                    className="flex justify-center items-center border max-w-[250px] max-h-[300px] rounded-lg  overflow-hidden bg-slate-500"
                    onClick={()=>{
                        handleModalStateImage(true)
                        handleModalViewImage(<ModalViewImage images={product?.images} url={urlsBackend.PRODUCT_IMAGE} index={indexImage} closeModal={handleCloseModals}/>)
                    }}
                >
                    <img 
                        className="object-contain w-full h-full"
                        src={productImage} 
                        alt={product.image} 
                    />
                </div>
                <div className="center-r gap-1 py-1">
                    {product?.images?.map((image,index) => 
                        <div 
                            key={image.id}
                            onClick={()=>setIndexImage(index)}
                        >
                            <img src={urlsBackend.PRODUCT_IMAGE + image?.name } alt={image?.name} className="w-10 h-10 rounded" />
                        </div>
                    )}
                </div>
            </div>
            
            <div className="flex flex-col gap-8">

            <div className=" flex flex-col max-w-md px-2 md:py-0 md:px-0">
                <span className="text-lg ">Descripción:</span>
                <span className=" font-poppins-regular">{product.description}</span> 
            </div>

            <div className=" flex flex-col justify-center items-start font-poppins-regular gap-y-2">
                
                <div className="center-r gap-x-4">
                    <span className="font-poppins-semibold">Grupo:</span>
                    <img className="w-5 h-5 " src={iconClasificacion} alt="" />
                    {product?.group?.name}
                </div>

                <div className="center-r gap-x-4">
                    <span className="font-poppins-semibold">Categoría:</span>
                    <img className="h-5 w-5" src={urlsBackend.CATEGORY + product?.category?.image?.name} alt="icon" />
                    {product?.category?.name}
                </div>

                <div className="center-r gap-x-4 ">
                    <span className="font-poppins-semibold">Tipo de producto:</span>
                    <img className="h-5 w-5" src={urlsBackend.ICON + product?.type_product?.image} alt="icon" />
                    {product?.type_product?.name}
                </div>
            

                {product?.weight!=="NADA" && (
                    <div className="center-r gap-x-4">
                        <p className="font-poppins-semibold">Peso:</p>
                        <img className="w-5 h-5 " src={weight} alt="peso" />
                        <p className="">{product?.weight}</p>
                    </div>
                )}

                {product?.size !=="NADA" && (
                    <div className="center-r gap-x-4">
                        <p className="font-poppins-semibold">Tamaño:</p>
                        <img className="w-5 h-5" src={size} alt="" />
                        <p className="">{product?.size}</p>
                    </div>
                )}

                {product?.number_color !== "NADA" && (
                    <div className="center-r gap-x-4">
                        <p className="font-poppins-semibold">Potencia:</p>
                        <img className="w-5 h-5" src={iconEnergy} alt="" />
                        <p className=" ">{product?.number_color}</p>
                    </div>
                )}
            
            </div>

            </div>
            
        </div>
        
        
    </div>
  )
}
export default memo(ModalViewProductSeller)