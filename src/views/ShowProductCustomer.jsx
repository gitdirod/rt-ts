import useStore from "../hooks/useStore"
import { useEffect, useState, memo } from "react"
import { useLocation } from "react-router-dom"
import { formatearDinero } from "../helpers"
import SuggestedsProducts from "../components/SuggestedsProducts"
import ShowCategories from "../components/ShowCategories"
import Footer from "../components/customer/Footer"
import IsLoading from "../components/IsLoading"
import Memories from "../components/Memories"
import LikeHart from "../components/LikeHart"
import ButtonLikeHart from "../components/ButtonLikeHart"
import { useAuth } from "/src/hooks/useAuth"
import useAdmin from "/src/hooks/useAdmin"
import ModalViewImage from "/src/components/ModalViewImage"
import { urlsBackend } from "/src/data/urlsBackend"

import iconCart from '/src/static/icons/cart.svg'
import iconBack from '/src/static/icons/common/backBlackFilled.svg'
import iconForward from '/src/static/icons/common/forwardBlackFilled.svg'
import iconClasificacion from '/src/static/icons/clasificacion_color.svg'
import iconEnergy from '/src/static/icons/energy_color.svg'
import size from '/src/static/icons/size.svg'

import weight from '/src/static/icons/weight.svg'
import UnidsAvailable from "/src/components/seller/UnidsAvailable"
import GoToGestor from "/src/components/admin/GoToGestor"
import ModalViewAddProduct from "/src/components/seller/ModalViewAddProduct"

export async function loader({ params }){
  return params.productName
}


const ShowProductCustomer=() => {

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const productCode = queryParams.get('code');

  const { products, order } = useStore()

  const { 
    user 
  } = useAuth({
    middleware: 'guest',
  })

  const {
    handleCloseModals,
    handleModalStateImage,
    handleModalViewImage,
    handleModalStateComponent,
    handleModalViewComponent,
  
  } = useAdmin()
  
  const productToShow =  products?.find((product)=> product.code === productCode)
  const inOrder = order?.find(product => product.id === productToShow?.id ) ?? null
  
  const [images, setImages] = useState([])
  const [indexImage, setIndexImage] = useState(0)
  const upIndex=()=>{
    if(indexImage === Number(images?.length)-1){
        setIndexImage(0)
        
    }else{
        setIndexImage(indexImage + 1)
    }
  }

  const downIndex=()=>{
    if(indexImage === 0){
        setIndexImage(Number(images?.length)-1)
        
    }else{
        setIndexImage(indexImage - 1)
    }
  }

  useEffect(()=>{
    setImages(productToShow?.images)
    setIndexImage(0)
  },[productToShow,products])
  if(productToShow === undefined || productToShow?.units < 0 ) return <IsLoading/>
  
  return (

  <>
      
    <div className="mx-auto md:max-w-7xl lg:max-w-screen-2xl mt-4 mb-16 border bg-white rounded-lg p-2">
      <div className="relative flex flex-col w-full lg:flex-row  rounded-lg h-full">
        
        <div className="flex flex-1 flex-col justify-between w-full lg:w-1/2 ">
                      
          <div className="relative flex flex-col justify-between  flex-1 h-full">
            <div></div>
            <div className="group relative center-r">
              <img 
                className="w-full rounded-lg object-contain h-full select-none border "
                src={urlsBackend.PRODUCT_IMAGE + productToShow.images?.[indexImage]?.['name']} 
                alt="imagen de producto" 
                onClick={()=>{
                  handleModalStateImage(true)
                  handleModalViewImage(<ModalViewImage images={productToShow.images} url={urlsBackend.PRODUCT_IMAGE} index={indexImage} closeModal={handleCloseModals}/>)
                }}
              />
              {
                images.length > 1 && (
                  <>
                  <div
                    className="absolute center-r left-0 shadow-md hover:scale-110 p-0.5 bg-white rounded-full transition-all cursor-pointer"
                    onClick={downIndex}
                  >
                    <img src={iconBack} className="w-10 h-10 grey opacity-80" alt="iconBack" />
                  </div>

                  <div
                    className="absolute center-r right-0 shadow-md hover:scale-110 p-0.5 bg-white rounded-full transition-all cursor-pointer"
                    onClick={upIndex}
                  >
                    <img src={iconForward} className="w-10 h-10 grey opacity-80" alt="iconForward" />
                  </div>
                  </>
                )}
            </div>

            {
              images.length > 1 && (
                <div className="w-full center-r transition-all gap-2 flex-wrap p-1">
                  {images?.map((image, index) =>(
                    <img 
                      key={image.id}
                      className={`cursor-pointer h-10 md:h-16 rounded-lg hover:scale-110 select-none transition-all ${indexImage === index ? 'border-2 border-cyanPrimary':'border'}`}
                      src={urlsBackend.PRODUCT_IMAGE + image?.name}
                      alt={image?.name} 
                      onClick={()=>setIndexImage(index)}
                    />
                  )) }
                    
                </div>
              )
            }

          </div>
        </div>

        <div className="relative flex flex-col justify-start font-poppins-regular text-slate-700 gap-y-8 items-start py-10 px-4 w-full lg:w-1/2">
          <div className="w-fit my-4 px-8 select-none">
              <div
                className="center-r w-full"
              >
                <LikeHart size="w-10" productId={productToShow.id} />
                <h1 className="font-poppins-extrabold text-3xl md:text-5xl  uppercase ">{productToShow.name}</h1>
              </div>
          </div>
          
          <div className="text-lg p-2 w-full">
            <p className=" font-poppins-bold">Descripción:</p>
            <p className=" border-b  p-2">{productToShow?.description}</p>
          </div>

          <div className=" center-c text-lg items-start gap-y-2">
            <div className="flex items-center gap-x-4 w-full">
              <img className="w-6 h-6 " src={iconClasificacion} alt="calsificacion" />
              {productToShow?.group?.name}
            </div>

            <div className="flex items-center gap-x-4 w-full">
              <img className="w-6 h-6" src={urlsBackend.ICON + productToShow?.type_product?.image} alt="icon" />
              <p className="">{productToShow?.type_product?.name}</p>
            </div>
            
            {
              productToShow?.weight!=="NADA" && (
                <div className="flex gap-x-4 items-center w-full">
                  <img className="w-6 h-6 " src={weight} alt="" />
                  <p className="">{productToShow?.weight}</p>
                </div>
              )
            }
            {
              productToShow?.size !=="NADA" && (
                <div className="flex gap-x-4 items-center w-full">
                  <img className="w-6 h-6" src={size} alt="icon" />
                  <p className="">{productToShow?.size}</p>
                </div>
              )
            }

            {
              productToShow?.number_color !== "NADA" && (
                <div className="flex gap-x-4 items-center w-full">
                  <img className="w-6 h-6" src={iconEnergy} alt="icon" />
                  <p className=" ">{productToShow?.number_color}</p>
                </div>
              )
            }
            
            <UnidsAvailable units={productToShow?.units} textColor='text-slate-700' style/>
          </div>

          

          <div className={`w-full font-poppins-extrabold text-center text-5xl text-cyanPrimary`}>
            <p>{formatearDinero(productToShow?.price)}</p>
          </div>

          <div 
            className="flex gap-2 justify-center items-center gap-y-2 w-full"
          >
            <div 
              className={`center-r font-poppins-bold group/buttom py-2 w-full cursor-pointer text-white rounded-lg bg-cyanPrimary`}
              onClick={()=>{
                handleModalStateComponent(true)
                handleModalViewComponent(<ModalViewAddProduct product={productToShow} closeModal={handleCloseModals}/>)
              }}
            >
              <div className="flex gap-x-2 group-hover/buttom:scale-110 transition-all">
                {inOrder ? '('+inOrder?.cantidad + ') Unidades':'Comprar'}
                <img className="w-6 h-6" src={iconCart} alt="icon"/> 
              </div>
            </div>
            

            <ButtonLikeHart
              productId={productToShow.id}
            />
          </div>
          
          <div className="absolute w-full bottom-0 left-0 flex justify-center items-center px-4">
            <div className="flex justify-center items-center gap-x-10 font-semibold">
              <p className="text-slate-600 text-xs sm:text-sm md:text-base">Código: <span className="  font-thin">{productToShow.code}</span></p>
              <p className="text-slate-600 text-xs sm:text-sm md:text-base">Categoría: <span className="  font-thin">{productToShow.category?.name}</span></p>
            </div>
          </div>
        </div>
        <GoToGestor to={"/admin/inventory/products/item/"+ productToShow.id}/>
      </div>
    </div>
    

    <div className="w-full mx-auto transition-all">
      <SuggestedsProducts/>
      <ShowCategories
          font="text-lg"
        />
      

        <Memories/>
        <Footer/> 
        <div className="h-10 md:hidden">
        </div>
    </div>
  </>
  )
}

export default memo(ShowProductCustomer)