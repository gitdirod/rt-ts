import useStore from "/src/hooks/useStore"
import { useNavigate } from "react-router-dom"
import IsLoading from "/src/components/IsLoading"
import { memo } from "react"
import add from '/src/static/icons/add.svg'
import iconItem from '/src/static/icons/item.svg'
import ok from '/src/static/icons/ok.svg'
import close from '/src/static/icons/close.svg'
import iconSearch from '/src/static/icons/search.svg'
import BlockHeader from "/src/components/admin/BlockHeader"
import LinkBtn from "../../components/admin/LinkBtn"
import TableHeader from "/src/components/admin/TableHeader"
import Tbody from "/src/components/admin/Tbody"
import { formatearDinero, formatearDinero2 } from "/src/helpers"
import ImageTable from "/src/components/admin/ImageTable"
import LabelSimpleWithoutLine from "/src/components/admin/LabelSimpleWithoutLines"


const IndexProduct =()=> {
  const {products} = useStore()
  
  const navigate = useNavigate()
  const handleSelect =(id)=>{
    navigate(`/admin/inventory/products/item/${id}`)
  }

  const columns = [
    { title: '#', className: 'w-10' },
    { title: 'Nombre', className: '' },
    { title: 'Clasificación', className: '' },
    { title: 'Precio', className: 'w-32' },
    { title: 'Unidades', className: 'w-32' },
    { title: 'Imagenes', className: '' },
    { title: 'Visible', className: 'w-20' },
  ];
  const renderRow = (item) => (
    <tr
      key={item.id}
      className='cursor-pointer group/item'
      onClick={() => handleSelect(item.id)}
    >
        {/* Aquí podrías renderizar las celdas como prefieras, dependiendo del item. */}
        <Td style='w-10 group-hover/item:border-l-slate-300 border-l rounded-l-lg'>
            {item.id}
        </Td>
        <Td style='flex-col'>
            <span className='text-md'>{item?.name}</span>
            <span className=' text-xs'>{item?.code}</span>
        </Td>
        <Td style='flex-col text-xs '>
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
        <Td style='w-32 '>
            {item?.price?formatearDinero(item?.price):'$0'}
        </Td>
        <Td style={`w-32 ${item?.units<0?'text-red-500 font-extrabold':''}`}>
            {item?.units?formatearDinero2(item?.units):'0'}
        </Td>
        <Td style="z-0">
            <ImageTable 
                images={item?.images}
                url={import.meta.env.VITE_API_URL + "/products/"}
                higth={14}
                count={true}
            />
        </Td>
        <Td style='w-20 border-r group-hover/item:border-r-slate-400 rounded-r-lg'>
          <img src={item?.available?ok:close} alt="visible" className={`w-5 h-5 ${item?.available?'green':'red'}`} />
        </Td>
    </tr>
);

  if(products === undefined) return (<IsLoading />)

  return (
  
    <div className="overflow-y-hidden flex flex-col flex-1 pb-2">

      {/* Cabecera */}
      <BlockHeader
        middle = {(
          <div>
            <LabelSimpleWithoutLine
              icon={iconSearch}
              // name='Buscar:'
            >
              <input 
                type="text" 
                placeholder='Buscar...'
                className=""
              />
            </LabelSimpleWithoutLine>
          </div>
        )}
            name={  
            <div className='flex'>
              <img src={iconItem} alt="save" className='w-8 h-8 pr-2' />
                Productos ({products?.length})
            </div>
            }
            
        >
          <LinkBtn
              to='/admin/inventory/storeProduct'
              icon={add}
              text='Nuevo'
              imageColor='white'
              style='bg-cyanPrimary'
          />
        </BlockHeader>
      {/* contenido */}

      <div className='flex flex-1 relative w-full overflow-hidden pb-5 overflow-y-auto ' >
        <div
            className=' w-full absolute '
        >
          <table className=" table-fixed w-full text-slate-600 ">
            <Tbody items={products} renderRow={renderRow} />
            <TableHeader columns={columns} />
          </table>
        </div>
      </div>
    </div>
  )
}

const Td = ({children, style='',id, select})=>{
  return(
      <td
          className='px-0'
          onClick={()=>{id? select(id):null}}
      >
      <div className={`py-1 font-poppins-regular text-sm bg-white group-hover/item:border-y-slate-400 group-hover/item:bg-slate- transition-all h-16 flex flex-1 items-center justify-center group-hover/item:font-poppins-semibold border-y ${style}`}>
          {children}
      </div>
  </td>
  )
}

export default memo(IndexProduct)
