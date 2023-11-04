import { useNavigate } from "react-router-dom"
import { memo, useState } from "react"
import IsLoading from "/src/components/IsLoading"
import { formatearDinero } from "/src/helpers"
import ImagesShower from "./ImagesShower"

import useAdmin from "/src/hooks/useAdmin"

import BlockHeader from "/src/components/admin/BlockHeader"
import iconEdit from '/src/static/icons/edit_filled01.svg'
import iconList from '/src/static/icons/list_circle.svg'
import cash from '/src/static/icons/cash.svg'
import inventario from '/src/static/icons/inventario.svg'
import clasificacion from '/src/static/icons/clasificacion.svg'
import size from '/src/static/icons/sizeBlack.svg'
import weight from '/src/static/icons/weightBlack.svg'
import iconEnergy from '/src/static/icons/energyBlack.svg'
import text from '/src/static/icons/text.svg'
import images from '/src/static/icons/images.svg'
import iconStore from '/src/static/icons/store.svg'
import iconItem from '/src/static/icons/item.svg'
import LinkBtn from "/src/components/admin/LinkBtn"
import { urlsBackend } from "/src/data/urlsBackend"

const ProductDescription=({product})=> {

    const {setProductAdmin} = useAdmin()
    const navigate = useNavigate()
    // const selectEditProduct= (proucto) =>{
    //     setProductAdmin(proucto)
    //     navigate(`/admin/products/item/edit/${proucto.id}`)
    // }
    const [imagesToDelete, setImagesToDelete] = useState([])

    if(product === undefined){return <IsLoading />} 
    // console.log(product)

    return (
        
        <div className="flex flex-wrap flex-col flex-1">
            {/* Top bar */}
            <BlockHeader
            name={  
                <div className='flex items-center'>
                  <img src={iconItem} alt="save" className='w-8 h-8 gray' />
                  {product?.name}
                </div>
                }
                code={product?.code}
            >
                
                <LinkBtn
                    to="/admin/inventory/products"
                    icon={iconList}
                    text='Lista'
                    imageColor='white'
                />

                <LinkBtn
                    to={`/store/product/${product?.name}?code=${product?.code}`}
                    icon={iconStore}
                    text='Ver en tienda'
                    imageColor='white'
                />

                <LinkBtn
                    to={`/admin/inventory/products/item/edit/${product.id}`}
                    icon={iconEdit}
                    text='Editar'
                    style="bg-cyanPrimary"
                    imageColor='white'
                />

                    
            </BlockHeader>

            {/* Bottom part */}
            <div className="overflow-y-auto flex-1 relative text-sm font-poppins-regular">
                <div className="w-full absolte">
                    <div className="flex flex-col justify-between p-0 gap-y-2 text-slate-600">
                        <div className=" w-full items-stretch">
                            <div className="flex gap-x-2 font-poppins-bold text-md items-end">
                                <img src={cash} alt="save" className='w-5 h-5 grey' /> 
                                Precio:
                            </div>
                            <div className="flex flex-wrap justify-around bg-white rounded-lg border p-2 font-bold">
                                <Tag label="Base">{formatearDinero(product.price)}</Tag>
                                <Tag label="IVA">{formatearDinero(product.price*0.12)}</Tag>
                                <Tag label="PVP">{formatearDinero(product.price*1.12)}</Tag>
                            </div>
                        </div>

                        <div className="w-full items-stretch">
                            <div className="flex gap-x-2 font-poppins-bold text-md items-end">
                                <img src={inventario} alt="save" className='w-5 h-5 grey' /> 
                                Inventario:
                            </div>
                            <div className="flex flex-wrap items-center justify-around rounded-lg bg-white border p-2 font-poppins-bold">
                                <Tag label="Ingresado">{product.purchased}</Tag>
                                <Tag label="Vendido">{product.sold}</Tag>
                                <Tag label="Disponible">{product.units}</Tag>
                                
                                {
                                    product.available ?
                                        <div className="center-r text-center px-2 text-green-500 font-poppins-bold">
                                            <p className="">Visible en tienda</p>
                                        </div>
                                        :
                                        <div className="center-r text-center px-2 font-poppins-bold">
                                            <p className="">No visible en tienda</p>
                                        </div>
                                }
                            </div>  
                        </div>
                        <div className="w-full items-stretch">
                            <div className="flex gap-x-2 font-poppins-bold text-md items-end">
                                <img src={clasificacion} alt="save" className='w-5 h-5 grey' /> 
                                Clasificación:
                            </div>
                            <div className="flex flex-wrap justify-around rounded-lg bg-white border p-2 font-poppins-bold">
                                <Tag label="Tipo"><div className="w-5 h-5">
                                    <img 
                                        src={import.meta.env.VITE_API_URL + "/iconos/" + product?.type_product?.image}
                                        alt="" 
                                    />
                                </div>{product.type_product?.name}</Tag>
                                <Tag label="Categoría">{product?.category?.name}</Tag>
                                <Tag label="Grupo" >{product.group?.name}</Tag>
                            </div>
                        </div>

                        <div className="w-full items-stretch">
                            <div className="flex gap-x-2 font-poppins-bold text-md items-end">
                                Otros:
                            </div>
                            <div className="flex flex-wrap rounded-lg justify-around bg-white border p-2 font-poppins-bold">
                                <Tag label="Tamaño">
                                    <img 
                                        className="w-5 h-5 grey"
                                        src={size}
                                        alt="" 
                                    />
                                    {product.size}</Tag>
                                <Tag label="Peso">
                                    <img 
                                        className="w-5 h-5 grey"
                                        src={weight}
                                        alt="" 
                                    />
                                    {product.weight}</Tag>
                                <Tag label="Potencia">
                                    <img 
                                        className="w-5 h-5"
                                        src={iconEnergy}
                                        alt="" 
                                    />
                                    {product.number_color}</Tag>
                            </div>
                        </div>

                        <div className="flex flex-col w-full items-stretch">
                            <div className="flex gap-x-2 font-poppins-bold text-md">
                                <img className="w-5 h-5 grey" src={text} alt="icon" /> 
                                Descripción:
                            </div>
                            <div className="flex flex-col border rounded-lg bg-white w-full px-4 p-2 gap-y-2">
                                <p className="text-md">{product.description}</p>
                            </div>
                            
                        </div>

                        <div className="flex flex-col w-full items-stretch">
                            <div className="flex gap-x-2 font-poppins-bold text-md">
                                <img className="w-5 h-5 grey" src={images} alt="" /> 
                                Imagenes:
                            </div>
                            <div className="bg-white border rounded-lg p-2 flex justify-start items-center">
                                <ImagesShower 
                                    images={product.images}
                                    url = {urlsBackend.PRODUCT_IMAGE}
                                    setDelete={setImagesToDelete}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
    </div>
        
    
        // </div>
            
    
    
  )
}

const Tag =({children, label=''})=>{
    return(
        <div className="flex gap-x-8">
            <div>{label}:</div>
            <div className="flex justify-center items-center gap-x-2 font-normal">
                {children}
            </div>
        </div>
    )
}
export default memo(ProductDescription)
