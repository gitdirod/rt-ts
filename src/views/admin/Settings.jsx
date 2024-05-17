import {memo} from 'react'
import SetLandingImage from './SetLandingImage'
import AddSuggestion from './AddSuggestion'
import useStore from '../../hooks/useStore'
import SuggestionBlock from './SuggestionBlock'
import AddMemory from './AddMemory'
import MemoryBlock from './MemoryBlock'
import images from '/src/static/icons/images.svg'
import fire from '/src/static/icons/fire.svg'


const Settings=()=> {
    const {
        suggestions,
        memories
    } = useStore()
    return (
        <div
            className='overflow-y-scroll flex-1 relative'
        >
            <div className='absolute flex flex-col w-full gap-y-8 pb-10'>
                <div className='px-4'>
                    <p className="font-bold text-4xl text-slate-600  pt-8">Configuraciónes de Página</p>
                </div>
                <div className='flex flex-col px-4'>
                    <div className='flex items-center  gap-x-2 font-bold text-slate-600 text-xl'>
                    <img className="w-6 h-6 grey" src={images} alt="" />
                        Imagenes Landing
                    </div>
                    <div className='flex border rounded-md p-4 text-slate-600 gap-x-2 bg-white'>
                        <SetLandingImage
                            type={0}
                        />
                        <SetLandingImage
                            type={1}
                        />
                        <SetLandingImage
                            type={2}
                        />
                    </div>
                </div>
                <div className='flex flex-col px-4'>
                    <div className='flex items-center  gap-x-2 font-bold text-slate-600 text-xl'>
                        <img className="w-6 h-6 grey" src={fire} alt="" />
                        Sugerencias
                    </div>
                    <div className='flex flex-col border rounded-md p-4 text-slate-600 bg-white gap-4'>
                        
                        <AddSuggestion/>
                        {
                            suggestions?.map(sugg=>(
                                <SuggestionBlock
                                    key={sugg.id}
                                    suggestion={sugg}
                                />
                            ))
                        }
                    </div>

                </div>

                <div className='flex flex-col px-4'>
                    <div className='flex items-center  gap-x-2 font-bold text-slate-600 text-xl'>
                        <img 
                            className="w-6 h-6 grey"
                            src={images}
                            alt="" 
                        /> 
                        Recuerdos
                    </div>
                    <div className='flex flex-col border rounded-md p-4 text-slate-600 bg-white gap-4'>
                        <AddMemory/>
                        {
                            memories?.map(mem=>(
                                <MemoryBlock
                                    key={mem.id}
                                    memory={mem}
                                />
                            ))
                        }
                
                    </div>

                </div>
            </div>
        </div>
  )
}

export default memo(Settings)
