import { useState } from 'react'
import useStore from '/src/hooks/useStore'
import { Link } from 'react-router-dom'
import IsLoading from '/src/components/IsLoading'
import BlockHeader from '/src/components/admin/BlockHeader'
import BlockType from '/src/components/admin/BlockType'
import iconAdd from '/src/static/icons/add.svg'
import IconTag from '/src/static/icons/tag.svg'
import BlockStoreType from '/src/components/admin/BlockStoreType'
import Btn from '/src/components/admin/Btn'


export default function IndexType(){
    const {types} = useStore()
    const[ activeAdd, setActiveAdd] = useState(false)

    if(types === undefined) return(<IsLoading/>)

    return (
    <div className='overflow-y-hidden flex flex-col flex-1 pl-2 pb-2'>
        <BlockHeader
            name={
                <div className='flex'>
                    <img src={IconTag} alt="save" className='w-8 h-8 pr-2' />
                    Tipos de producto ({types?.length})
                </div>
            }
        >
            {
                !activeAdd && (
                    <Btn
                        icon={iconAdd}
                        text='Nuevo'
                        style='bg-green-500'
                        action={()=>setActiveAdd(true)}
                    />
                )
            }
        </BlockHeader>
        <div className="flex flex-1 relative w-full overflow-hidden pb-5 overflow-y-auto">
            <div className='w-full absolute'>
                {activeAdd && ( <BlockStoreType setAction={setActiveAdd}/>)}
                <div className='pb-1 pr-1'>
                {types?.map(type => (
                    <BlockType
                        key={type.id}
                        type={type}
                    />
                ))}
                </div>
            </div>
        </div>
        
    </div>
  )
}