import { useEffect, useState } from 'react';
import useStore from '/src/hooks/useStore'
import useAdmin from '/src/hooks/useAdmin'

import moment from 'moment/dist/moment';
import 'moment/dist/locale/es'
import localization from 'moment/locale/es';
moment.suppressDeprecationWarnings = true;
moment.updateLocale('es', localization);
// import iconCalendar from '/src/static/icons/calendar.svg'


export default function BlockLanding({children, item, type}) {

    const {
        create,

    }= useAdmin()
    const {mutateLandings} = useStore()

    const [image, setImage]= useState([])
    const [errores, setErrores] = useState()
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)
    
    const handleSubmit = e => {
        e.preventDefault()
        
        const newLanding = {
            type: type.value,
            image: image[0]
        }
        if(!waiting){
            create('landings',newLanding,setErrores,setState, setWaiting)
        }
    }



    return (
        <div className=' border rounded-lg center-c flex-1 flex-wrap'>
            <div className={`relative gap-x-1 flex w-full  font-bold rounded-t-lg text-sm justify-start p-2 items-center ${image?.length>0?'bg-green-600':'text-slate-700'} bg-white flex-1 border-b slate-300`}>
            {children}
                {
                    !image?.length > 0 && (
                        <div className='absolute right-1 cursor-pointer overflow-hidden'>
                            {/* <UploadImage
                                max={1}
                                setImages={setImage}
                                image={image}
                            >
                                <img src={iconEdit} alt="" className='w-5 h-5 green'/>
                            </UploadImage> */}
                        </div>
                    )
                    
                }
            </div>
            <div className='w-full justify-center flex bg-white p-1'>
                {
                    image?.length > 0?
                    <img 
                        className=" max-w-[300px] md:max-w-[500px] md:max-h-[200px] object-fill"
                        src={image[0]?.preview} 
                        alt={image[0]?.name} 
                        onLoad={()=>{
                        URL.revokeObjectURL(image[0].preview)
                        }}
                    />
                    :
                    <img 
                        src={import.meta.env.VITE_API_URL + "/landings/" + item?.name}
                        className=' max-w-[300px] md:max-w-[500px] md:max-h-[200px]  object-fill'
                        alt="" 
                    />
                    
                }
            </div>
            <div className={`relative rounded-b-lg flex w-full   font-bold  text-sm justify-center items-center ${image?.length>0?'bg-green-600':'text-slate-800'} bg-white border-t`}>
            
                <div className='center-r w-full'>
                    {
                        image?.length>0?
                        "sss"
                        :
                        <div className='center-r py-2'>
                            {/* <img src={iconCalendar} alt="" className='w-5 h-5 grey'/> */}
                            <span className=' font-thin'>{moment(item?.updated_at).format("ll")}</span>
                        </div>
                    }
                </div>
            </div>
            
            
        </div>
    )
}
