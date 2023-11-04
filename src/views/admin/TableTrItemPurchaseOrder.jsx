import delet from '/src/static/icons/delete.svg'
import {
    memo,
    useRef
} from 'react'

const TableTrItem=({item, productId, chageItem, deleteItem})=> {
    const unitsRef = useRef()
    const priceRef = useRef()
    const {name, code, quantity, price} = item

    const verifyInput = (e, id, int = true)=>{
        var getValue= document.getElementById(id);
        if(isNaN(+e.target.value)){
            getValue.value = 0
        }else if(!isInt(getValue.value) && int ){
            getValue.value = 0
        }
        chageItem(
            {
                id:productId,  
                product_id:productId,  
                name:item.name,  
                code:item.code,  
                subtotal:Number(unitsRef.current.value)*Number(priceRef.current.value),  
                quantity: Number(unitsRef.current.value), 
                price:Number(priceRef.current.value)
            }
        )
    }
    function isInt(n) {
        return n % 1 === 0;
    }
    return (
    <tr
        className='cursor-pointer group/item'
    >
        <Td style=' border-l rounded-l-lg'>
            <div
                onClick={()=>{
                    deleteItem(productId)
                }}
            >
                <img src={delet} alt="save" className='w-5 h-5' />
            </div>
            {productId}
        </Td>
        <Td>{name}</Td>
        <Td>{code}</Td>
        <Td style=''>
            
            <input 
                id={'priceItem'+productId}
                type="text"
                className=' outline-none w-14 text-center group-hover/item:border group-hover/item:border-green-500 rounded border-white' 
                defaultValue={price}
                min="0"
                step="1"
                ref={priceRef}
                onChange={(e)=> {
                    verifyInput(e,'priceItem'+productId, false)
                }}
            />
        </Td>
        <Td style=' border-r rounded-r-lg'>
            <input 
                id={'unitsItem'+productId}
                type="text"
                className=' outline-none w-14 text-center group-hover/item:border group-hover/item:border-green-500 rounded border-white' 
                defaultValue={quantity}
                min="0"
                step="1"
                ref={unitsRef}
                onChange={(e)=> {
                    verifyInput(e,'unitsItem'+productId)
                }}
            />
        </Td>
    </tr>
  )
}
const Td = ({children, style=''})=>{
    return(
        <td
            className='px-0'
        >
        <div className={`py-1 bg-white group-hover/item:border-green-500 transition-all h-10 center-r flex-1 font-poppins-regular group-hover/item:font-poppins-semibold border-y ${style}`}>
            {children}
        </div>
    </td>
    )
}

export default memo(TableTrItem)
