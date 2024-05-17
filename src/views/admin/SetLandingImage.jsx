import {memo, useState} from 'react'
import UploadLanding from '/src/components/admin/UploadLanding'
import useStore from '/src/hooks/useStore'
import close from '/src/static/icons/close.svg'

const SetLandingImage =({type})=> {

    const {landings} = useStore()
    const [edit, setEdit] = useState(false)

    return (
        <div className='flex justify-between flex-col p-1 flex-1 border rounded-md items-center'>
            <p className='font-bold'>
                {
                    type===0?
                        <span>Movil 600 x 1000</span>
                    :type==1?
                        <span>Tablet 1200 x 1200</span>
                    :type==2?
                        <span>Desktop 3200 x 1200</span>
                    :   <span>Error</span>

                }
            </p>
            {
                edit?
                <div className='w-full'>
                    <UploadLanding
                        type={type}
                        setEdit={setEdit}
                    />
                </div> 
                :
                <div className='relative'>
                    {
                        landings?
                        <img 
                            className='h-40 rounded-md shadow-md border border-white'
                            src={import.meta.env.VITE_API_URL + "/landings/" + landings?.[type]?.name}
                            alt="" 
                        />
                        :
                        ""
                    }
                    <div 
                        className='absolute h-full  top-0  opacity-0  hover:opacity-100 border-white border bg-opacity-70 flex gap-x-2 justify-center items-center bg-black cursor-pointer px-4 py-1 rounded-md text-white font-bold w-full transition-all text-shadow'
                        onClick={()=>setEdit(!edit)}
                    >
                        Cambiar
                    </div>
                </div>
            }
            
            <div 
                className='flex justify-center items-center w-full '
                onClick={()=>setEdit(!edit)}
            >
               {
                edit?
                <div className='flex gap-x-2 justify-center items-center bg-slate-600 cursor-pointer px-4 py-1 rounded-md text-white font-bold w-full'>
                    <img className="w-6 h-6 grey" src={close} alt="" />
                    <p>Cancelar</p>
                </div>
               :
               ''
                // <div className='flex gap-x-2 justify-center items-center bg-green-500 cursor-pointer px-4 py-1 rounded-md text-white font-bold w-full'>
                //     Cambiar
                // </div>
               }
            </div>
        </div>
  )
}

export default memo(SetLandingImage)
