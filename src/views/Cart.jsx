import { memo } from "react";
import useStore from "../hooks/useStore";
import BottomBarClient from "../components/BottomBarClient";
import { formatearDinero } from "../helpers";
import SummaryProduct from "../components/SummaryProduct";
import SideBarClient from "../components/SideBarClient";

import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuth } from "/src/hooks/useAuth";
import TittleName from "/src/components/TittleName";
import useAdmin from "/src/hooks/useAdmin";
import ModalViewPurchase from "/src/components/customer/ModalViewPurchase";
import NoProductsToShow from "/src/components/common/NoProductsToShow";
import iconCuestion from "/src/static/img/cuestions.svg"
import { urlsSocial } from '/src/data/urlsSocial'

const Cart=()=> {
    const navigate = useNavigate()
    
    const {
            order, 
            subtotal, 
            handleClickModalBuy
        } = useStore()  

    const { user } = useAuth({middleware: 'guest'})

    const {
        handleModalStateComponent,
        handleModalViewComponent,
        handleCloseModals
    } = useAdmin()

    const handleBuy = ()=>{
        if(user?.email_verified_at){
            handleClickModalBuy()
        }else if(user?.email_verified_at === null){
            toast.error(<span className="font-bold">¡Verificar cuenta!</span>, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else{
            
            toast.error(<span className="font-bold">¡Primero debes iniciar sesión!</span>, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTimeout(()=>{
                navigate('/auth/login/')
            }, 5000)
            
        }

    }
    
    return (
    <div className="flex flex-1 w-full cursor-default text-slate-700 ">
        {
            user? <BottomBarClient/>: ''
        }
        <div className="flex w-full">
        {
            user? <SideBarClient/>:''
        }
        <div 
            className="mx-auto w-full pb-10 mt-4 flex justify-center items-center flex-col relative"
        >
        {/* Contenedor de productos y resumen */}
        {order.length === 0 ? (
            <NoProductsToShow icon={iconCuestion} goTo='/store/'/>
        ):(

        <div className="flex flex-1 w-full flex-col items-center md:flex-row md:items-start md:space-x-4 md:px-4 rounded-sm pb-4">
            {/* Contenedor de productos */}
            <div className="flex flex-col justify-between w-11/12 md:w-2/3 overflow-y-auto">
            
                <TittleName style='bg-cyanPrimary text-white my-2'>Mi carrito</TittleName>

                <div className="center-c gap-1">
                    {/* Contenedor de producto */}
                    <div className="font-bold text-white px-4 py-2 bg-red-700 rounded-md cursor-pointer font-normal">
                        <a href={urlsSocial.facebook} target="_blank">
                        Valor a pagar <span className="font-bold">NO INCLUYE GASTOS DE ENVÍO</span>, Antes de realizar tu pago, consulta primero con nuestros asesores. Click aquí para contactar con un vendedor.
                        </a>
                    </div>

                    {order.map(product =>(
                        <SummaryProduct 
                            key={product.id}
                            product={product}
                        />
                    ))}
                    
                </div>
            </div>

            {/* Contenedor de resumen */}
            <div className="flex flex-col md:items-center w-11/12  md:w-1/3 font-poppins-bold overflow-y-hidden ">
                
                 <TittleName font style='bg-slate-700 text-white my-2'>Resumen de Compra</TittleName>

                <div className="flex flex-col w-full bg-white overflow-hidden border rounded-lg">
                    
                    <div className="py-4 px-4">
                        <div className="flex justify-between items-center px-4">
                            <p className="font-poppins-regular"> Subtotal</p>
                            <p>{formatearDinero(subtotal)}</p>
                        </div>
                        <div className="flex justify-between items-center px-4">
                            <p className="font-poppins-regular">Impuestos</p>
                            <p>{formatearDinero(subtotal * 0.15)}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center px-8 py-4 border-t border-t-slate-300">
                        <p className="font-poppins-regular">Total:</p>
                        <p>{formatearDinero(subtotal* 1.15)}</p>
                    </div>
                    <div className="w-full">
                        <div 
                            className="w-full bg-cyanPrimary py-2 hover:bg-slate-700 duration-150 transition-all cursor-pointer"
                            onClick={()=>{
                                handleModalStateComponent(true)
                                handleModalViewComponent(<ModalViewPurchase closeModal={handleCloseModals}/>)
                            }}
                        >
                            <div
                                className="flex justify-center items-center gap-x-2 text-white font-bold uppercase"
                            >
                                <span>Proceder con el pago</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
                                </svg>

                            </div>
                        </div>
                    </div>
                </div>
                

            </div>

        </div>

        )}
        
            
        </div>
    </div>
    </div>
    )
}

export default memo(Cart)