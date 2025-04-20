import { useState, useEffect, memo } from "react"
import useStore from "/src/hooks/useStore"

import Btn from "/src/components/admin/Btn"
import LinkBtn from "/src/components/admin/LinkBtn"

import iconCart from '/src/static/icons/seller/cart.svg'
import iconAddCart from "/src/static/icons/seller/addCart.svg"
import iconClose from '/src/static/icons/seller/close.svg'
import iconCheck from "/src/static/icons/seller/check.svg"
import iconDelete from "/src/static/icons/admin/delete.svg"

import {formatearDinero} from "/src/helpers/index"
import UnidsAvailable from "../store/product/UnidsAvailable"
import { urlsBackend } from "/src/data/urlsBackend"


const ModalViewAddProduct=({product, isButtonCart=true, urlCart='/store/cart', closeModal})=> {

    const {handleAddOrder, order, handleRemoveProduct} = useStore()
    const [cantidad, setCantidad] = useState(1)

    const productImage = urlsBackend.PRODUCT_IMAGE + product.images[0]?.name

    const isInCart = order?.some(orderProduct=> orderProduct?.id === product?.id) ? true : false;

    useEffect(()=>{
        if(isInCart){
            const productEdition = order.filter( orderState => orderState.id === product.id)[0]
            setCantidad(productEdition.cantidad)
        }
    }, [order])

    

    if(Object.keys(product).length === 0){
        return null
    }

    return (
    <div className=" md:flex flex-col w-full font-poppins-extrabold bg-white rounded-lg overflow-hidden max-h-screen">
        <div className="relative gap-4 center-r p-2 font-light bg-slate-800 text-white text-2xl">
            <img src={iconCheck} className="w-8" alt="ok" />
            <span className="text-base md:text-xl font-bold">{isInCart?'Actualizar unidades':'Agregar producto al Carrito'}</span>
            <Btn
                style='md:absolute bg-white right-2 '
                icon={iconClose}
                imageColor
                action={()=>{
                    closeModal()
                }}
            />
        </div>
        
        <div className=" relative center-c text-slate-700 md:flex-row  max-h-screen    md:gap-x-16 px-1 md:px-10 py-2">
            <UnidsAvailable units={product?.units} textColor="slate-700 sm:absolute md:top-2  md:right-2"/>
            <div className="flex justify-center items-center border max-w-[250px] max-h-[300px] rounded-lg  overflow-hidden">
                <img 
                    className="object-contain w-full h-full"
                    src={productImage} 
                    alt={product.image} 
                />
            </div>
            
            <div className=" center-c text-lg  px-2 md:py-0 md:px-0">
                <span>{product.name}</span>
                <span className=" font-poppins-regular">{product.code}</span> 
            </div>


            <div className="center-c">   
                <div className="center-c font-poppins-extrabold text-2xl">
                    <p>{formatearDinero(product.price)}</p>
                    <span className="font-bold text-xs text-cyanDark ">Más impuestos</span>
                </div>
                <div className="center-r gap-0.5">
                    <button
                        className="bg-slate-800 text-white rounded center-r w-6"
                        type="button"
                        onClick={()=>{
                            if(cantidad <= 1) return
                            setCantidad(cantidad - 1)
                            
                        }}
                    >
                        -
                    </button>

                    <div 
                        className="w-10 rounded border center-r"
                    >
                        {cantidad}
                    </div>

                    <button
                        className="bg-slate-800 text-white rounded center-r w-6 "
                        type="button"
                        onClick={()=>{
                            if(cantidad >= product.units) return
                            setCantidad(cantidad + 1)
                            
                        }}
                    >
                        +
                    </button>
                </div>            
            </div>



        </div>
        <div className="center-r gap-x-4 p-2 md:px-10 border-t">
            
            {
                isInCart && (
                    <Btn
                        icon={iconDelete}
                        text='Eliminar'
                        style='bg-slate-800'
                        isButton={false}
                        imageColor
                        action={()=>{
                            handleRemoveProduct(product.id)
                        }}
                    />
                )
            }
            <Btn
                icon={iconAddCart}
                text={
                    isInCart?'Actualizar unidades':'Agregar al carrito'
                }
                style='bg-cyanPrimary'
                isButton={false}
                imageColor
                action={()=>{
                    handleAddOrder({...product, cantidad})
                }}
            />
            {isButtonCart && (
                <LinkBtn
                    to={urlCart}
                    icon={iconCart}
                    text='Ir al Carrito'
                    imageColor
                    style='bg-pinkPrimary'
                    action={()=>{
                        closeModal()
                    }}
                />
            )}
            
        </div>
        
    </div>
  )
}
export default memo(ModalViewAddProduct)