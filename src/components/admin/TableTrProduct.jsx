import ImageTable from '/src/components/admin/ImageTable'
import { formatearDinero } from '/src/helpers'
import { formatearDinero2 } from '/src/helpers'
import ok from '/src/static/icons/ok.svg'
import close from '/src/static/icons/close.svg'
import edit from '/src/static/icons/edit.svg'
import {memo} from 'react'

const TableTrProduct=({item, select, editItem, order})=> {
    
    
    const {
        id,
        name, 
        code, 
        units, 
        price,
        product_type_name, 
        available,
        images
    } = item

    
    return (
    <tr
        className='cursor-pointer group/item'
    >
        <Td style='w-10 rounded-l group-hover/item:border-l-slate-400 border-l' id={id} select={select}>
            {id}
        </Td>
        <Td style='flex-col' id={id} select={select}>
            <span className='text-md'>{name}</span>
            <span className=' text-xs'>{code}</span>
        </Td>
    
        <Td style='flex-col text-xs ' id={id} select={select}>
            <span>G. {item?.group?.name}</span>
            <span>C. {item?.category?.name}</span>
            <div className="flex justify-center items-center gap-2">
            <div className="w-5 h-5">
                <img 
                src={import.meta.env.VITE_API_URL + "/iconos/" + item?.type_product?.image}
                alt="Tipo de producto" 
                />
            </div>
            <span>{item?.type_product?.name}</span>
            </div>
        </Td>
        <Td style='w-32 ' id={id} select={select}>
            {price?formatearDinero(price):'$0'}
        </Td>
        <Td style={`w-32 ${units<0?'text-red-500 font-extrabold':''}`} id={id} select={select}>
            {units?formatearDinero2(units):'0'}
        </Td>
        <Td id={id} select={select}>
            <ImageTable 
                images={images}
                url={import.meta.env.VITE_API_URL + "/products/"}
                higth={14}
                count={true}
            />
        </Td>
        <Td style='w-32' id={id} select={select}>
            {available ?
                <img src={ok} alt="save" className='w-5 h-5 green' />
                :
                <img src={close} alt="save" className='w-5 h-5 grey' />
            }
        </Td>
        <Td style='border-r group-hover/item:border-r-slate-400 rounded-r'>
            <div 
                onClick={()=>editItem(id)}
            >
                <img src={edit} alt="save" className='w-5 h-5 grey ' />
            </div> 
        </Td>
        
        
    </tr>
  )
}
const Td = ({children, style='',id, select})=>{
    return(
        <td
            className='px-0'
            onClick={()=>{id? select(id):null}}
        >
        <div className={`py-1 text-sm bg-white group-hover/item:border-y-slate-400 group-hover/item:bg-slate- transition-all h-16 flex flex-1 items-center justify-center group-hover/item:font-semibold border-y ${style}`}>
            {children}
        </div>
    </td>
    )
}

export default memo(TableTrProduct)