import { formatearDinero } from "/src/helpers"
import { useEffect, useState } from "react"
import useStore from "/src/hooks/useStore"
import iconDelete from '/src/static/icons/delete.svg'
import { urlsBackend } from "/src/data/urlsBackend"


export default function SummaryProduct({product}) {

    const {name, code, price, cantidad} = product
    const {handleAddOrder, handleRemoveProduct} = useStore()
    const [editCantidad, SetEditCantidad] = useState(product.cantidad)

    useEffect(()=>{
        if(editCantidad != product.cantidad){
            handleAddOrder({...product, cantidad : editCantidad})
        }
    })

    return (
        <div className="flex flex-col justify-between bg-white w-full border rounded-lg overflow-hidden font-poppins-bold cursor-default">

            <div className="flex flex-col py-4 md:py-0 md:flex-row md:justify-between items-center  px-4 gap-x-10 ">
                <div className="flex flex-col md:flex-row justify-center items-center py-1">
                    <img 
                        className="w-40 rounded-lg"
                        src={urlsBackend.PRODUCT_IMAGE + product?.images[0]?.name}
                        alt={product?.name} 

                    />
                </div>
                <div className="center-c font-poppins-regular text-md text-slate-700  px-2 md:px-0 w-full pt-2">
                    <p>{name} {code}</p>
                </div>

                <div className="center-c">   
                    <div className="font-poppins-extrabold text-2xl">
                        <span>{formatearDinero(price)}</span>
                    </div>
                    <div className="center-r gap-0.5">
                            
                        {/* Restar */}
                        <button
                            className="bg-slate-700 text-white rounded center-r w-6"
                            type="button"
                            onClick={()=>{
                                if(editCantidad <= 1) return
                                SetEditCantidad(editCantidad - 1)
                            }}
                    
                        >
                            -
                        </button>

                        <div 
                            className="w-10 rounded border center-r"
                        >
                            {cantidad}
                        </div>

                        {/* Sumar */}
                        <button
                            className="bg-slate-700 text-white rounded center-r w-6"
                            type="button"
                            onClick={()=>{
                                if(editCantidad >= product?.units) return
                                SetEditCantidad(editCantidad +1)
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center border-t px-2 md:px-6 bg-slate-700 text-white ">
                <button 
                    className="center-r gap-1"
                    onClick={()=>{
                        handleRemoveProduct(product.id)
                    }}
                >
                    <img src={iconDelete} className="w-4 h-4 white"  alt="iconDelete" />
                    Eliminar
                </button>

                <p className="font-normal">
                    Total: <span className="">{formatearDinero(price * cantidad)}</span>
                </p>
            </div>

        </div>
    )
}
