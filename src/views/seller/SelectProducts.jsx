import React, { useEffect, useState } from 'react'
import UnidsAvailable from '/src/components/seller/UnidsAvailable'
import { formatearDinero } from '/src/helpers'
import useStore from '/src/hooks/useStore'
import useAdmin from '/src/hooks/useAdmin'
import ModalViewProductSeller from '/src/components/seller/ModalViewProductSeller'
import ModalViewAddProduct from '/src/components/seller/ModalViewAddProduct'
import { urlsBackend } from '/src/data/urlsBackend'
import { useLocation } from 'react-router-dom'

export default function SelectProducts() {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const groupName = queryParams.get('gro');
    const categoryName = queryParams.get('cat');
    const searchName = queryParams.get('search');

    const { products } = useStore()

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
      let filtered = [];
      if(products?.length > 0){
         filtered = [...products];
      }
  
      if (searchName) {
        filtered = filtered?.filter(product =>  product.available == true && 
        ( product.name.toUpperCase().replace(/\s+/g, '').includes(searchName.toUpperCase().replace(/\s+/g, '')) || 
            product.code.toUpperCase().replace(/\s+/g, '').includes(searchName.toUpperCase().replace(/\s+/g, ''))
        ));
      }

      if (categoryName) {
        filtered = filtered?.filter(product => product.category?.name === categoryName && product.available);
      }
  
      if (groupName) {
        filtered = filtered?.filter(product => product.group?.name === groupName && product.available);
      }
  
      setFilteredProducts(filtered);
  
    }, [products, categoryName, groupName, searchName]);

    
    return (
        <div id='cointainerProducts' className='w-full overflow-y-auto flex-1 relative'>

            <div className='absolute p-1 w-full grid items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 '>
            {
                filteredProducts?.map(product=> (
                    <SellerProduct
                        key={product?.id}
                        product={product}
                    />
                ))
            }
            </div>
        </div>
    )
}

const SellerProduct = ({product}) => {
    
    const {
        handleModalStateComponent,
        handleModalViewComponent,
        handleCloseModals
    } = useAdmin()
    const {order} = useStore()

    const productInCart = order?.filter(productOrder=> productOrder.code === product?.code )[0] ?? null;
    
    return(
        <div className='relative h-full center-c rounded-lg overflow-hidden border bg-white font-poppins-regular'>
            <div className='w-full flex justify-end px-1'><UnidsAvailable textColor='text-slate-600' units={product?.units}/></div>
            <div 
                className='w-full center-c cursor-pointer h-full '
                onClick={()=>{
                    handleModalStateComponent(true)
                    handleModalViewComponent(<ModalViewProductSeller product={product} closeModal={handleCloseModals}/>)
                }}
            >
                <img 
                    className='w-fit h-full max-h-52'
                    src={urlsBackend.PRODUCT_IMAGE + product.images[0]?.name} 
                    alt={product.images[0]?.name} 
                />
                <div className=' text-slate-700 px-2 w-full'>
                    <span className=' uppercase text-[11px] md:text-sm '>{product?.name} {product?.code}</span>
                </div>
            </div>
            
            <div className={`flex justify-around items-center ${productInCart ? 'bg-cyanPrimary' : 'bg-slate-800'} w-full py-2`}>
                <div className='center-r font-poppins-bold '
                    onClick={()=>{
                        handleModalStateComponent(true)
                        handleModalViewComponent(<ModalViewAddProduct urlCart='/sellerAdmin/admin/cart' product={product} closeModal={handleCloseModals}/>)
                    }}
                >
                    <div className=' text-slate-600 bg-white rounded-lg px-2 text-[12px] uppercase cursor-pointer p-1'>
                        {productInCart ? productInCart?.cantidad+' unidades' : 'Agregar'}
                    </div>
                </div>
                <span className={`w-20 font-poppins-extrabold ${productInCart ? 'text-white' : 'text-cyanPrimary'} text-center text-xl`}>{formatearDinero(product.price)}</span>
            </div>
                
            
        </div>
    )
}
