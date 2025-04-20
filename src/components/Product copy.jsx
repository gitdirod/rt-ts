import { formatearDinero } from "/src/helpers"
import { useNavigate } from "react-router-dom"
import useStore from "/src/hooks/useStore"
import { useState, useEffect, memo } from "react"
import iconCart from '/src/static/icons/cart.svg'
import Btn from "./admin/Btn"
import { urlsBackend } from "/src/data/urlsBackend"
import UnidsAvailable from "./store/product/UnidsAvailable"
import useAdmin from "/src/hooks/useAdmin"
import ModalViewAddProduct from "./seller/ModalViewAddProduct"


const Product=({product})=> {
    const navigate = useNavigate()
    const { order} = useStore()
    const [inCart, setInCart] = useState(false)

    useEffect(()=>{
        order?.some( orderState =>  orderState.id === product.id ) ? setInCart(true) : setInCart(false)
    }, [order])

    const {
        handleModalStateComponent,
        handleModalViewComponent,
        handleCloseModals
    } = useAdmin()

    return (
        <>

            <div 
                className="  flex font-poppins-regular text-slate-700 flex-col justify-between items-center bg-white rounded-lg border overflow-hidden group hover:shadow-lg  transition-all min-w-[250px] shrink-0 w-full  "
            >
                
                <div 
                    className="h-full px-2 pt-2 cursor-pointer flex flex-col w-full justify-between items-center overflow-hidden"
                    onClick={()=>{
                        navigate('/store/product/'+product.name+'?code='+product.code)
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        })
                    }}
                >
                    <div className="flex justify-between items-center gap-2 w-full">
                        <div className="center-r gap-2">
                            <img 
                                src={urlsBackend.ICON+ product?.type_product?.image}
                                alt="icon" 
                                className="h-5 w-5"
                            />
                            <span className=" text-sm">
                                {product?.group?.name}
                            </span>
                        </div>
                        <UnidsAvailable units={product?.units} textColor='text-slate-700'/>
                    </div>
                    <div className="center-r flex-1 w-full overflow-hidden">
                        <img 
                            className="className='w-fit h-full max-h-52"
                            src={urlsBackend.PRODUCT_IMAGE + product.images[0]?.name}
                            alt={product.name} 
                        />
                    </div>
                    <span 
                        className="text-md font-poppins-regular w-full "
                    >
                        {product.name} {product.code}
                    </span>
                    
                </div>
                
                <div className={`h-full flex justify-around items-center w-full  p-1 ${inCart?'bg-cyanPrimary':'bg-slate-700'}`}>
                    <Btn
                        imageColor
                        text={inCart ? "Ver en carrito" : "Comprar"}
                        icon={iconCart}
                        style={` ${inCart?'bg-white':'bg-cyanPrimary'}`}
                        isButton={false}
                        textColor={` ${inCart?'text-cyanPrimary':'text-white'}`}
                        action={()=>{ 
                            if(!inCart){
                                handleModalStateComponent(true)
                                handleModalViewComponent(<ModalViewAddProduct product={product} closeModal={handleCloseModals}/>)
                                
                            }else{
                                navigate('/store/cart')
                            }
                        }}
                    />
                    <span className="text-xl text-white font-poppins-extrabold">
                        {formatearDinero(product.price)}
                    </span>
                </div>
            </div>
        </>
    )
}

export default memo(Product)