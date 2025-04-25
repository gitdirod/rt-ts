import useStore from '/src/hooks/useStore'
import BlockHeader from '/src/components/admin/BlockHeader'

import { useState } from 'react'

import Btn from '/src/components/admin/Btn'

import iconAdd from '/src/static/icons/add.svg'
import IconComment from '/src/static/icons/comment.svg'
import IsLoading from '/src/components/store/common/IsLoading'

export default function IndexComments(){
    const {memories} = useStore()
    const [adding, setAdding] = useState(false)

    if(memories === undefined) return(<IsLoading/>)

    return (
    <div className='overflow-y-hidden flex flex-col flex-1 pl-2 pb-2'>
        <BlockHeader
            name={
                <div className='flex'>
                    <img src={IconComment} alt="save" className='w-8 h-8 pr-2' />
                    Comentarios de clientes
                </div>
            }
        >
            {!adding && (
                <Btn
                    icon={iconAdd}
                    text='Nuevo'
                    style='bg-green-500'
                    action={()=>setAdding(true)}
                />
            )}
        </BlockHeader>
        
        <div className="flex flex-1 relative w-full overflow-hidden pb-5 overflow-y-auto">
            <div className='w-full'>
                
            </div>
        </div>
        
    </div>
  )
}