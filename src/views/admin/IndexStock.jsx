import useStore from '/src/hooks/useStore'
import IsLoading from '../../components/store/common/IsLoading'
import BlockHeader from '/src/components/admin/BlockHeader'
import iconStock from '/src/static/icons/kardex.svg'
import { formatearDinero2 } from '/src/helpers'
import { useNavigate } from 'react-router-dom'
import TableHeader from '/src/components/admin/TableHeader'
import Tbody from '/src/components/admin/Tbody'


 export default function IndexGroup (){
    const {products} = useStore()

    const columns = [
        { title: 'id', className: 'w-10' },
        { title: 'Código', className: '' },
        { title: 'Nombre', className: '' },
        { title: 'Ingresa', className: '' },
        { title: 'Egresa', className: '' },
        { title: 'Unidades', className: '' },
      ];
    
    const navigate = useNavigate()
    const handleSelect = (id) => {
    navigate(`/admin/inventory/stock/product/${id}`);
    }
    const renderRow = (item) => (
        <tr
          key={item.id}
          className='cursor-pointer group/item font-poppins-regular'
          onClick={() => handleSelect(item.id)}
        >
            {/* Aquí podrías renderizar las celdas como prefieras, dependiendo del item. */}
            <Td style='w-10 group-hover/item:border-l-slate-300 border-l rounded-l-lg'>
                {item.id}
            </Td>
            <Td style='' >
                <span className=' text-sm'>{item.code}</span>
            </Td>
            <Td style='' >
                <span className='text-md'>{item.name}</span>
            </Td>
            <Td style={` ${item?.units<0?'text-red-500 font-extrabold':''}`} >
                {item?.purchased}
            </Td>
            <Td style='' >
                {item?.sold}
            </Td>
            <Td style='border-r group-hover/item:border-r-slate-300 rounded-r-lg' >
                {item?.units}
            </Td>
        </tr>
    );

    if(products === undefined) return(<IsLoading/>)
    return (
    <div className='overflow-y-hidden flex flex-col flex-1'>
        <BlockHeader
            name={  
                <div className='flex items-center'>
                  <img src={iconStock} alt="save" className='w-8 h-8 gray pr-2' />
                  Resumen de existencias
                </div>
                }
        >
           
            <div className=' text-slate-700 font-bold '>
                {products?.length} Productos
            </div>
        </BlockHeader>
        <div className="flex flex-1 relative w-full overflow-hidden pb-5 overflow-y-auto">
            <div className='w-full absolute'>

                <div className='pb-1 pr-1 flex flex-col gap-2'>
                    <table className=" table-fixed w-full text-slate-600 ">
                        <Tbody items={products} renderRow={renderRow} />
                        <TableHeader columns={columns} />
                    </table>
                </div>
            </div>
        </div>
        
    </div>
  )
}

const Td = ({children, style=''})=>{
    return(
        <td
            className='px-0'
            
        >
        <div className={`py-1 bg-white group-hover/item:border-y-slate-400 group-hover/item:border-r-slate-400 group-hover/item:border-l-slate-400 transition-all h-8 flex flex-1 center-r group-hover/item:font-semibold border-y ${style}`}>
            {children}
        </div>
    </td>
    )
}