import useStore from '/src/hooks/useStore'
import IsLoading from '../../components/IsLoading'
import BlockHeader from '/src/components/admin/BlockHeader'
import iconDesktop from '/src/static/icons/desktop.svg'
import BlockLanding from '/src/components/admin/BlockLanding'
import { DEVICE_TYPES } from '/src/data/deviceTypes'


export default function IndexLanding() {

    
    const {landings} = useStore()
    if(landings === undefined) return(<IsLoading/>)
    return (
    <div className='overflow-y-hidden flex flex-col flex-1 pl-2 pb-2'>
        <BlockHeader
            name={
                <div className='flex'>
                <img src={iconDesktop} alt="save" className='w-8 h-8 pr-2' />
                Landing
                </div>
            }
        >
           
        </BlockHeader>
        <div className="flex flex-1 relative w-full overflow-hidden pb-5 overflow-y-auto">
            <div className='w-full absolute'>
                <div className='pb-1 pr-1 flex gap-2 flex-wrap'>
                    <BlockLanding
                        type={DEVICE_TYPES.MOBILE}
                        item={landings?.mobile}
                    >
                        <img src={DEVICE_TYPES.MOBILE.icon} alt="" className='w-6 h-6'/>
                        {DEVICE_TYPES.MOBILE.label}  
                    </BlockLanding>
                    <BlockLanding
                        type={DEVICE_TYPES.TABLET}
                        item={landings?.tablet}
                    >
                        <img src={DEVICE_TYPES.TABLET.icon} alt="" className='w-6 h-6'/>
                        {DEVICE_TYPES.TABLET.label}
                    </BlockLanding>
                    <BlockLanding
                        type={DEVICE_TYPES.DESKTOP}
                        item={landings?.desktop}
                    >
                        <img src={DEVICE_TYPES.DESKTOP.icon} alt="" className='w-6 h-6'/>
                       {DEVICE_TYPES.DESKTOP.label}
                    </BlockLanding>
                </div>
            </div>
        </div>
        
    </div>
  )
}

