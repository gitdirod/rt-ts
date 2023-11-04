import { useState } from 'react'
import useStore from '/src/hooks/useStore'
import useAdmin from '/src/hooks/useAdmin'
import IsLoading from '../../components/IsLoading'
import BlockHeader from '/src/components/admin/BlockHeader'
import BlockItemOne from '/src/components/admin/BlockItemOne'
import BlockStoreItemOne from '/src/components/admin/BlockStoreItemOne'
import ImageTable from '/src/components/admin/ImageTable'
import Btn from '/src/components/admin/Btn'
import TableHeader from '/src/components/admin/TableHeader'
import iconAdd from '/src/static/icons/add.svg'
import iconFire from '/src/static/icons/fire.svg'
import iconFireBlack from '/src/static/icons/fireBlack.svg'
import ModalViewSuggested from '/src/components/ModalViewSuggested'

export default function IndexSuggested() {
    const { 
        suggestions, 
        suggesteds
    } = useStore()
    const {
        handleSetModalSuggested,
        handleSetSuggestion,

        handleModalStateComponent,
        handleModalViewComponent,
        handleCloseModals
    } = useAdmin()
    const {mutateSuggestions} = useStore()
    const[ activeAdd, setActiveAdd] = useState(false)

    const columns = [
        { title: '#', className: 'w-10' },
        { title: 'Nombre', className: '' },
        { title: 'Grupo', className: '' },
        { title: 'Categoría', className: '' },
        { title: 'Tipo', className: '' },
        { title: 'Imagenes', className: '' }
      ];
    
    if(suggestions === undefined && suggesteds === undefined) return(<IsLoading/>)

    return (
    <div className='overflow-y-hidden flex flex-col flex-1 pl-2 pb-2'>
        <BlockHeader
            name={
                <div className='flex'>
                <img src={iconFire} alt="save" className='w-8 h-8 pr-2' />
                Productos sugeridos
                </div>
            }
        >
            {
                !activeAdd && (
                    <Btn
                        icon={iconAdd}
                        text='Nuevo grupo'
                        action={()=>setActiveAdd(true)}
                        isButton={false}
                        style="bg-green-500"
                    />
                )
            }
        </BlockHeader>
        <div className="flex flex-1 relative w-full overflow-hidden pb-5 overflow-y-auto">
            <div className='w-full absolute'>

                {
                    activeAdd && (
                        <BlockStoreItemOne
                            url='suggestions'
                            icon={iconFireBlack}
                            labelName='Grupo sugerido:'
                            itemName='Nuevo grupo'
                            setAction={setActiveAdd}
                            mutate={mutateSuggestions}
                        />
                    )
                }
                <div className='pb-1 pr-1 flex flex-col  gap-y-2'>
                    {suggestions?.map(suggestion => (
                        <div
                            key={suggestion.id}
                        >
                            <BlockItemOne
                                nameBlock={"Editar grupo sugerido: " + suggestion?.name}
                                url='suggestions'
                                icon={iconFireBlack}
                                group={suggestion}
                                mutate={mutateSuggestions}
                                styleName="font-bold border-b"
                                divEdit={
                                    <div className='center-c gap-1 relative w-full p-1'>
                                        
                                        <Btn
                                            text='Agregar producto'
                                            icon={iconAdd}
                                            textColor='text-green-500'
                                            imageColor='green'
                                            style="border border-green-500"
                                            isButton={false}
                                            action={()=>{
                                                handleModalStateComponent(true)
                                                handleModalViewComponent(<ModalViewSuggested closeModal={handleCloseModals}/>)
                                                // handleSetModalSuggested(true)
                                                // handleSetSuggestion(suggestion)
                                            }}
                                        />
                                        <table className=" table-fixed  w-full text-slate-600 ">
                                            <TableHeader columns={columns} z='z-0' style='base-th-class-green' />
                                            <tbody className='w-full  '>
                                            {
                                                suggesteds?.map(item=> item?.suggestion?.id === suggestion?.id && (
                                                    <ItemListSuggested
                                                        key={item.id}
                                                        item={item}
                                                    />
                                                ))
                                            } 
                                            </tbody>
                                        </table>
                                    </div>
                                }
                                
                            >

                                <div className='flex justify-start items-center flex-wrap gap-2 p-2'>
                                {
                                    suggesteds?.map(item=> item?.suggestion?.id === suggestion?.id && (
                                        <SuggestedProduct
                                            key={item.id}
                                            item={item}
                                        />
                                    ))
                                }   

                                <div
                                    className=' hover:bg-green-100 rounded-lg hover:border-green-400 border border-transparent  cursor-pointer h-20 w-20 flex justify-center items-center group/add'
                                    onClick={()=>{
                                        handleModalStateComponent(true)
                                        handleModalViewComponent(<ModalViewSuggested closeModal={handleCloseModals}/>)
                                        // handleSetModalSuggested(true)
                                        // handleSetSuggestion(suggestion)
                                    }}
                                >
                                    <img src={iconAdd} alt="save" className='w-6 h-6 green group-hover/add:scale-125 transition-all'/>
                                </div>
                                </div>
                            </BlockItemOne>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    </div>
  )
}

const ItemListSuggested = ({item})=>{

    return(
        <tr className=' group/item text-green-500'>

            <Td style='w-10 group-hover/item:border-l-green-500 rounded-l-lg border-l ' >
                {item?.id}
            </Td>
            <Td style='flex-col'>
                <span>{item.name}</span>
                <span className=' text-sm'>{item.code}</span>
            </Td>
            <Td style='text-sm'>
                <span>{item?.group?.name}</span>
            </Td>
            <Td style='text-sm'>
            <span>{item?.category?.name}</span>
            </Td>
            <Td style='text-sm'>
                <div className="flex justify-center items-center gap-2">
                    <div className="flex w-4 h-4">
                        <img 
                        src={import.meta.env.VITE_API_URL + "/iconos/" + item.type_product?.image}
                        alt="Tipo de producto" 
                        />
                    </div>
                    <span className='text-center'>{item?.type_product?.name}</span>
                </div>
            </Td>
            <Td style='group-hover/item:border-r-green-400 border-r rounded-r-lg'>
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

const SuggestedProduct = ({item})=>{
    return(
        <div className='py-0.5'>
            <img 
                className="h-20 rounded"
                src={import.meta.env.VITE_API_URL + "/products/" + item.images[0].name} 
                alt="imagen" 
            />
        </div>
    )
}

const Td = ({children, style='',id, select})=>{
    return(
        <td
            className='px-0'
            onClick={()=>{id? select(id):null}}
        >
        <div className={`py-1 text-sm bg-white group-hover/item:border-y-green-400 transition-all h-16 flex flex-1 items-center justify-center group-hover/item:font-bold border-y ${style}`}>
            {children}
        </div>
    </td>
    )
}
