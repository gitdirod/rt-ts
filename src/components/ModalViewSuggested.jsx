import {memo, useState, useEffect} from 'react'
import useAdmin from '/src/hooks/useAdmin'
import useStore from '/src/hooks/useStore'
import ImageTable from './admin/ImageTable'
import TableHeader from './admin/TableHeader'
import LabelSimple from './admin/LabelSimple'
import Btn from './admin/Btn'
import ModalViewRequest from './admin/ModalViewRequest'
import iconClose from '/src/static/icons/close.svg'
import iconSearch from '/src/static/icons/search.svg'
import iconUpdate from '/src/static/icons/update.svg'
import iconFire from '/src/static/icons/fire.svg'

const ModalViewSuggested=({closeModal})=> {

    const {
        create,
        suggestion,
        handleModalViewRequest,
        handleModalStateRequest
    } = useAdmin()
    const {
        mutateSuggesteds,
        products,
        suggesteds
    }=useStore()
    


    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [errores, setErrores] = useState({})

    const handleSelect = (pro)=> {
        const newSuggested = {
            product_id: pro.id,
            suggestion_id: suggestion.id
        }
        if(!waiting){
            create('suggesteds',newSuggested,setErrores,setState, setWaiting)
        }
    }

    useEffect(()=>{
        if(state){
            mutateSuggesteds()
            setState(false)
        }
        handleModalViewRequest(<ModalViewRequest text="Actualizando..." icon={iconUpdate}/>)
        handleModalStateRequest(waiting)
    },[waiting])
    
    const rest = products.map((e1) => {
        if (!suggesteds.filter(e2 => e2.id === e1.id).length > 0)return e1
    }).filter(pro => pro !== undefined )

    const suggestedsSelected = suggesteds?.filter(item => item?.suggestion?.id == suggestion.id)

    const columns = [
        { title: '#', className: 'w-10' },
        { title: 'Nombre', className: '' },
        { title: 'Grupo', className: '' },
        { title: 'Categoría', className: '' },
        { title: 'Tipo', className: '' },
        { title: 'Imagenes', className: '' }
      ];

    return (
        <div className=' h-screen  w-screen p-4 md:p-14 '>
            <div className='w-full center-c gap-2 bg-slate-100 scroll-y pb-4 rounded-lg overflow-hidden p-2 '>
                <div className='w-full border flex justify-between items-center gap-x-2 font-bold bg-white rounded p-1 shadow text-slate-700 flex-1'> 
                    <div></div>

                    <div className='center-r'>
                        <img src={iconFire} className='w-6' alt="icono" />
                        Agregar productos a "{suggestion?.name}"
                    </div>
                    <Btn
                        isButton={false}
                        icon={iconClose}
                        text='Cerrar'
                        action={()=>closeModal()}
                    />
                </div>
                <div className='center-c gap-1'>
                    
                    <LabelSimple
                        image={iconSearch}
                        error={errores.code}
                    >
                        <input 
                        type="text" 
                        placeholder='Buscar...'
                        
                        />
                    </LabelSimple>

                    <div className='flex flex-col px-4'>
                        <table className=" table-fixed  w-full text-slate-600 ">
                        <TableHeader columns={columns} z='z-10' style='base-th-class-green' />
                            <tbody className='w-full  '>
                            {
                                suggestedsSelected?.map(item=> (
                                    <ItemListSuggested
                                        key={item.id}
                                        item={item}
                                        selectFunction={handleSelect}
                                        style="group-hover/item:border-y-green-500 group-hover/item:border-l-green-600 bg-green-100 text-green-500 group-hover/item:border-r-green-400"
                                        
                                    /> 
                                ))
                            } 
                            {
                                rest?.map(item=> (
                                    <ItemListSuggested
                                        key={item.id}
                                        item={item}
                                        selectFunction={handleSelect}
                                        style="group-hover/item:border-y-slate-500 "
                                    />
                                ))
                            } 
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default memo(ModalViewSuggested)

const ItemListSuggested = ({item, style, selectFunction})=>{

    return(
        <tr className=' group/item cursor-pointer'
            onClick={()=>{item? selectFunction(item):null}}
        >
            <Td style={`w-10 border-l rounded-l-lg ${style} `}  >
                {item?.id}
            </Td>
            <Td style={` ${style}`} >
                <span>{item.name}</span>
                <span className=' text-sm'>{item.code}</span>
            </Td>
            <Td style={` ${style}`} >
                <span>{item.group?.name}</span>
            </Td>
            <Td style={` ${style}`} >
            <span>{item.category?.name}</span>
            </Td>
            <Td style={`  ${style}`} >
                <div className="center-c gap-2">
                    <div className="flex w-4 h-4">
                        <img 
                        src={import.meta.env.VITE_API_URL + "/iconos/" + item.type_product?.image}
                        alt="Tipo de producto" 
                        />
                    </div>
                    <span className='text-center'>{item?.type_product?.name}</span>
                </div>
            </Td>
            <Td style={` border-r rounded-r ${style}`} >
                <ImageTable 
                    images={item?.images}
                    url={import.meta.env.VITE_API_URL + "/products/"}
                    higth={14}
                    count={true}
                />
            </Td>
            
        </tr>
    )
}

const Td = ({children, style='',item, select})=>{
    return(
        <td
            className='px-0'
            onClick={()=>{item? select(item):null}}
        >
        <div className={`py-1 text-sm bg-white transition-all h-16 flex-1 center-r group-hover/item:font-bold border-y  ${style}`}>
            {children}
        </div>
    </td>
    )
}