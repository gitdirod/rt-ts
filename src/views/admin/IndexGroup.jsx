import { useState } from 'react'
import useStore from '/src/hooks/useStore'
import IsLoading from '../../components/store/common/IsLoading'
import BlockHeader from '/src/components/admin/BlockHeader'
import BlockItemOne from '/src/components/admin/BlockItemOne'
import BlockStoreItemOne from '/src/components/admin/BlockStoreItemOne'
import add from '/src/static/icons/add.svg'
import iconGroup from '/src/static/icons/groupBlack.svg'
import iconGroupColor from '/src/static/icons/group.svg'
import BlockCategory from "/src/components/admin/BlockCategory";
import BlockStoreCategory from '/src/components/admin/BlockStoreCategory'
import Btn from '/src/components/admin/Btn'
import { GroupService } from '/src/services/GroupService'
import { CategoryService } from '/src/services/CategoryService'


export default function IndexGroup (){

    const { data:groups, mutate:mutateGroups } = GroupService.useAllGroups() 
    const { data:categories } = CategoryService.useAllCategories() 
 

    const[ activeAdd, setActiveAdd] = useState(false)
    const[ addCategory, setAddCategory] = useState(false)
    
    if(groups === undefined) return(<IsLoading/>)
    return (
    <div className='overflow-y-hidden flex flex-col flex-1'>
        <BlockHeader
            name={
                <div className='flex'>
                <img src={iconGroupColor} alt="save" className='w-8 h-8 pr-2' />
                    Grupos & Categorías
                </div>
            }
        >
            {
                !activeAdd && (
                    <Btn
                        icon={add}
                        text='Nuevo grupo'
                        style='bg-green-500'
                        action={()=>setActiveAdd(true)}
                    />
                )
            }
            {
                !addCategory && (
                    <Btn
                        icon={add}
                        text='Nueva categoría'
                        style='bg-green-500'
                        action={()=>setAddCategory(true)}
                    />
                )
            }
        </BlockHeader>
        <div className="flex flex-1 relative w-full overflow-hidden pb-5 overflow-y-scroll">
            <div className='w-full absolute'>

                {addCategory && (<BlockStoreCategory setAction={setAddCategory} />)}

                {
                    activeAdd && (
                    <BlockStoreItemOne
                        url='groups'
                        icon={iconGroup}
                        itemName='Nuevo grupo'
                        labelName='Grupo:'
                        setAction={setActiveAdd}
                        mutate={mutateGroups}
                    />)       
                }
                <div className='flex flex-col gap-1'>
                    {groups?.map(group => (
                        <div
                            key={group.id}
                        >
                            <BlockItemOne
                                nameBlock={"Editar: " + group?.name}
                                icon={iconGroup}
                                url='groups'
                                group={group}
                                mutate={mutateGroups}
                                styleName=" font-poppins-bold text-slate-700 overflow-hidden"
                                styleOptions="gray"
                            >
                                <div className='flex justify-start items-center flex-wrap gap-2 p-2 bg-white border'>
                                {
                                    categories?.map(category=> category?.group_id === group?.id && (
                                        <BlockCategory
                                            category={category}
                                            key={category?.id}
                                        />
                                    ))
                                }
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
