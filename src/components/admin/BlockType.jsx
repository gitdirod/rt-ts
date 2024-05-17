import useAdmin from "/src/hooks/useAdmin"
import { urlsBackend } from "/src/data/urlsBackend"
import ModalViewStoreUpdateType from "/src/components/admin/modals/ModalViewStoreUpdateType"

export default function BlockType({type}) {

    const {
        handleModalStateComponent,
        handleModalViewComponent
    } = useAdmin()

    const editItem=()=>{
        handleModalViewComponent(<ModalViewStoreUpdateType item={type}/>)
        handleModalStateComponent(true)
    }

    return (
        <div 
            className="relative flex items-center border mt-0.5 py-2  cursor-pointer group rounded-lg bg-white hover:border-slate-400"   
            onClick={editItem}
        >
            <div className='flex gap-x-4 items-center text-slate-700 group-hover:font-bold transition-all'>
                <span className=' w-10 px-4 text-sm '>
                    {type.id}
                </span>
                <div className="center-r w-24 h-10">
                    <img 
                        src={urlsBackend.ICON +type?.image} 
                        alt="save" className='object-contain h-10' 
                    />
                </div>
                <div className=''>
                    {type.name}
                </div>
            </div>
        </div>
    )
}
