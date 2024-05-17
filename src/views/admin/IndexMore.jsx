import { memo, useState } from 'react'
import useStore from '/src/hooks/useStore'
import IsLoading from '/src/components/IsLoading'
import BlockItemOne from '/src/components/admin/BlockItemOne'
import BlockHeader from '/src/components/admin/BlockHeader'
import IconAdd from '/src/static/icons/add.svg'
import iconSize from '/src/static/icons/size.svg'
import iconSizeBlack from '/src/static/icons/sizeBlack.svg'
import iconEnergy from '/src/static/icons/energy.svg'
import iconEnergyBlack from '/src/static/icons/energyBlack.svg'
import iconStar from '/src/static/icons/star.svg'
import BlockStoreItemOne from '/src/components/admin/BlockStoreItemOne'
import Btn from '/src/components/admin/Btn'
import ModalViewStoreUpdateItem from '/src/components/admin/modals/ModalViewStoreUpdateItem'
import useAdmin from '/src/hooks/useAdmin'



const IndexMore =()=>{
    const {sizes, numbers} = useStore()
    const [addNumber, setAddNumber] = useState(false)
    const [addSize, setAddSize] = useState(false)
    const {
        mutateSizes,
        mutateNumbers
    } = useStore()

    const {
        handleModalStateComponent,
        handleModalViewComponent
    } = useAdmin()

    const storeSize =()=>{
        handleModalViewComponent(
            <ModalViewStoreUpdateItem 
                url='sizes'
                mutate={mutateSizes}
                headerTitle="Nuevo tamaño" 
                labelName="Tamaño" 
                iconColor={iconSize} 
                iconBlack={iconSizeBlack}
            />
        )
        handleModalStateComponent(true)
    }
    
    if(sizes === undefined || numbers === undefined) return(<IsLoading/>)
    return (
    <div className='overflow-y-hidden flex flex-col flex-1 pl-2 pb-2'>
        <BlockHeader
            name={
                <div className='flex'>
                <img src={iconStar} alt="save" className='w-8 h-8 pr-2' />
                Ajustes adicionales
                </div>
            }
        >
        
        </BlockHeader>
        <div className="flex flex-1 relative w-full overflow-hidden pb-5 overflow-y-scroll">
            <div className='w-full absolute '>
                <div className='flex  flex-wrap gap-4 flex-col md:flex-row pb-1 pr-1'>

                    <div className='flex flex-col flex-1 shrink-0'>
                        <BlockHeader
                            name={
                            <div className='flex gap-x-2 items-center'>
                                <img src={iconSize} alt="save" className='w-5 h-5' />
                                Dimensiones
                            </div>
                            }
                        >
                            {
                                !addSize && (
                                    <Btn
                                        icon={IconAdd}
                                        text='Nuevo'
                                        style='bg-green-500'
                                        action={storeSize}
                                        // action={()=>setAddSize(true)}
                                    />
                                )
                            }
                        </BlockHeader>
                        {
                            addSize?
                                <BlockStoreItemOne
                                    url='sizes'
                                    itemName='Nueva dimensión'
                                    icon={iconSizeBlack}
                                    labelName='Dimension:'
                                    setAction={setAddSize}
                                    mutate={mutateSizes}
                                />
                                :
                                <div className='-mb-3'></div>
                        }
                        <div>
                            {sizes?.map(size => (
                                <div
                                    key={size.id}
                                >
                                    <BlockItemOne
                                        nameBlock={"Editar dimensión: " + size?.name }
                                        url='sizes'
                                        icon={iconSizeBlack}
                                        labelName='Dimension:'
                                        group={size}
                                        mutate={mutateSizes}
                                        
                                    />
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className='flex flex-col flex-1 shrink-0'>
                        <BlockHeader
                            name={
                            <div className='flex gap-x-2 items-center'>
                                <img src={iconEnergy} alt="save" className='w-5 h-5' />
                                Potencia wattios
                            </div>
                            }
                        >
                            {
                                !addNumber && (
                                    <Btn
                                    icon={IconAdd}
                                    text='Nuevo'
                                    style='bg-green-500'
                                    action={()=>setAddNumber(true)}
                                />)
                            }
                        </BlockHeader>
                        {
                            addNumber?
                                <BlockStoreItemOne
                                    url='number_colors'
                                    itemName='Nueva potencia'
                                    setAction={setAddNumber}
                                    mutate={mutateNumbers}
                                    icon={iconEnergyBlack}
                                    labelName='Potencia:'
                                />
                                :
                                <div className='-mb-3'></div>
                        }
                        <div>
                            {numbers?.map(numer => (
                                <div
                                    key={numer.id}
                                >
                                    <BlockItemOne
                                        nameBlock={"Editar potencia: " + numer?.name}
                                        url='number_colors'
                                        group={numer}
                                        icon={iconEnergyBlack}
                                        mutate={mutateNumbers}
                                        labelName='Potencia:'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
        
    </div>
  )
}
export default memo(IndexMore)
