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
// import TableHeader from "/src/components/admin/TableHeader"
// import Tbody from "/src/components/admin/Tbody"
import { formatearDinero, formatearDinero2 } from "/src/helpers"
import ImageTable from "/src/components/admin/ImageTable"
import LabelSimpleWithoutLine from "/src/components/admin/LabelSimpleWithoutLines"


const IndexProductNew =()=> {
  const {products} = useStore()
  
  const navigate = useNavigate()
  const handleSelect =(id)=>{
    navigate(`/admin/inventory/products/item/${id}`)
  }

  const columns = [
    { title: '#', className: 'w-10' },
    { title: 'Código', className: '' },
    { title: 'Nombre', className: '' },
    { title: 'Categoría', className: '' },
    { title: 'Grupo', className: '' },
    { title: 'Tipo', className: '' },
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
        <Td>
            {item.id}
        </Td>
        <Td >
            {item?.code}
        </Td>
        <Td>
            {item?.name}
        </Td>
        <Td >
            {item?.group?.name}
        </Td>
        <Td >
            {item?.category?.name}
        </Td>
        <Td >
            <img 
                src={import.meta.env.VITE_API_URL + "/iconos/" + item?.type_product?.image}
                alt="Tipo de producto" 
                className="w-6"
            />
            {item?.type_product?.name}
        </Td>
    
        <Td >
            {item?.price?formatearDinero(item?.price):'$0'}
        </Td>
        <Td>
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
        <Td>
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

      <div className='flex flex-1 relative w-full  pb-5 overflow-x-auto ' >
        <div
            className=' w-full absolute '
        >
          <table className=" border overflow-x-scroll table-fixed w-full text-slate-600 ">
            <Tbody items={products} renderRow={renderRow} />
            <TableHeader columns={columns} /> 
          </table>
        </div>
      </div>
    </div>
  )
}

const Td = ({children,id, select})=>{
  return(
      <td
          className=' px-0 border-y bg-white '
          onClick={()=>{id? select(id):null}}
      >
      <div className="center-r gap-1 shrink-0">{children}</div>
  </td>
  )
}

export default memo(IndexProductNew)


const Tbody = ({ items, renderRow }) => (
    <>
    <tbody className='w-full'>
      {items?.map(item => renderRow(item))}
    </tbody>
    </>
);

const TableHeader =({ columns, style='base-th-class', z='z-0'})=> {
    return (
      
      <thead className={`w-full sticky top-0 text-xs font-poppins-regular shrink-0   ${z} `} >
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              className={`${style} ${column.className} ${index === 0 ? 'rounded-tl-lg' : ''} ${index === columns.length - 1 ? 'rounded-tr-lg' : ''}`}
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
    );
  }


