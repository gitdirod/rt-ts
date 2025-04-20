import {memo} from 'react'
import useStore from '/src/hooks/useStore'
import TittleName from './store/common/TittleName'
import { urlsBackend } from '/src/data/urlsBackend'

const Memories=({})=> {
    const {
        memories
    }= useStore()
  
    if(memories?.length === 0) return null
    return (
        <div className="relative center-c gap-y-2  w-full px-1 pt-8 shrink-0 overflow-hidden">
            <TittleName>
                Nuestros orfebres
            </TittleName>
        
            <div className="relative center-c md:flex-row flex-wrap gap-2 text-center  w-full py-4">
            
                {
                    memories?.map(memory=>(
                        <div
                            key={memory.id}
                            className='relative font-poppins-bold text-white md:w-96 rounded-lg overflow-hidden shadow-md '
                        >
                            <div
                                className='bg-pinkPrimary w-full p-1'
                            >
                                <span className=' text-xl '>{memory.name}</span>
                            </div>
                            <div>
                                <img 
                                    className=''
                                    src={urlsBackend.MEMORY + memory.image}  
                                    alt={memory.name}
                                />
                            </div>
                            <div
                                className='absolute center-c opacity-0 hover:opacity-100 transition-all top-0 bottom-0 right-0 left-0  backdrop-blur-md bg-pinkPrimary bg-opacity-50 p-4'
                            >
                                <span className='  text-xl py-2 center-c'>
                                    {memory.name}
                                </span>
                                <div className=' overflow-y-scroll scrollbar-3 font-poppins-regular'>
                                    <span>{memory.description}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
                
            </div>
        
        </div>
    )
}

export default memo(Memories)
