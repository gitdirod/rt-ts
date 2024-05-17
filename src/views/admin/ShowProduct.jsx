import { useLoaderData } from "react-router-dom"
import { memo } from "react"
import useStore from "../../hooks/useStore"
import IsLoading from "../../components/IsLoading"
import ProductDescription from "../../components/admin/ProductDescription"
import TableSimple from "../../components/admin/TableSimple"


export async function loader({ params }){
    return params.itemId
}


const ShowProduct =()=> {
    
    const {products} = useStore()
    const productUrl = useLoaderData()
    const product =  products?.find((product)=> product.id === Number(productUrl))
    
    if(product === undefined) return (<IsLoading />)
    
    return (
        <div className="flex-1 flex gap-1 h-[100%]">
            <div className=" overflow-y-hidden flex">
                <TableSimple 
                    items = {products}
                    item = {product}
                    actionUrl = {"/admin/inventory/products/item/"}
                />
            </div>
            {/* Item description  */}
            
            <div className="flex flex-1">
                <ProductDescription 
                    product = {product}
                /> 
            </div>
        
        </div>
    )
}
export default memo(ShowProduct)
