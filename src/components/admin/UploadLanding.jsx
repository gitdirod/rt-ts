import {useCallback, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import { useState } from 'react'
import Alert from '/src/components/Alert'
import { memo } from 'react'

import useAdmin from '/src/hooks/useAdmin'
import useStore from '/src/hooks/useStore'
import imgDelete from '/src/static/icons/delete.svg'
import add from '/src/static/icons/add.svg'


const UploadLandig =({type, setEdit, max = 1})=> {
    const {create}= useAdmin()
    const {mutateLandings} = useStore()

    const [files, setFiles] = useState([])
    const [rejected, setRejected] = useState([])

    const [images, setImages] = useState()
    const [errores, setErrores] = useState()
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        // Do something with the files

        if(acceptedFiles?.length && files <= max){ 
            const toSave = acceptedFiles.filter(fileAccepted => !files.some(file => file.name === fileAccepted.name))
            setFiles(previosFiles => [
            ...previosFiles,
            ...toSave.map(file => {
                return Object.assign(file, { preview: URL.createObjectURL(file) })
                })
            ])
            setImages(files)
        }
        if(rejectedFiles?.length){
            setRejected(previosFiles => [...previosFiles, ...rejectedFiles])
        }
    })
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, 
        accept: {
        'image/*':[]
        },
        maxSize: 10000 * 10000,
        maxFiles: max,
    })
    const removeFile = (name)=>{
        setFiles(files => files.filter(file => file.name !== name))
    }
    useEffect(()=>{
        setImages(files)
    },[files])

    const handleSubmit = e => {
        e.preventDefault()
        
        const newLanding = {
            type: type,
            images: images
        }
        if(!waiting){
            create('landings',newLanding,setErrores,setState, setWaiting)
        }
    }

    useEffect(()=>{
        if(state){
            mutateLandings()
            setState(false)
            setEdit(false)
        }else{
            setState(false)
        }
    },[waiting])
 

    return (
        <div className='text-slate-600 w-full' >
            <div className='w-full flex-wrap'>
                {
                    files.length == 0?
                    <div 
                        className='border rounded-md cursor-pointer bg-slate-100 py-2'
                        {...getRootProps()}
                    >
                        <input 
                            {...getInputProps()}
                            id="images"
                            className='w-full'
                        />
                        {
                            isDragActive ?
                                <p className='font-semibold transition-all duration-200'>
                                    Suelta aquí
                                </p> 
                                :
                                <div className='flex text-center flex-col  items-center font-semibold  transition-all duration-200'>
                                    <div className='border rounded-full border-slate-600'>
                                        <img 
                                            className="w-6 h-6 grey"
                                            src={add}
                                            alt="" 
                                        />
                                    </div>
                                    Agregar imagen, o click para seleccionar.
                                </div>
                        }
                    </div>
                    :
                    ''
                }
                {/* Preview */}
                <ul className='py-1 flex justify-center items-end gap-x-4 shrink-1 flex-wrap w-full'>
                {files.map(file => (
                    <li 
                        className='relative flex flex-col justify-center items-center flex-shrink-0 group  rounded-md border p-1 bg-white'
                        key={file.preview}
                    >
                        <img 
                            className='h-40 rounded-md'
                            src={file.preview} 
                            alt={file.name} 
                            onLoad={()=>{
                            URL.revokeObjectURL(file.preview)
                            }}
                        /> 
                        <button
                            type='button'
                            className='absolute opacity-0 hover:opacity-100 h-full bg-white transition-all flex justify-center gap-x-2 items-center text-red-500 bg-opacity-80 rounded-md w-full'
                            onClick={()=> removeFile(file.name)}
                        >
                            <img className="w-10 h-10 grey" src={imgDelete} alt="" />
                            
                        </button>
                    </li>
                ))}
                
                </ul>
                {
                    files.length?
                        <form 
                            className='flex justify-center my-1'
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <button className=' cursor-pointer flex  justify-center font-bold items-center text-white bg-green-500 rounded-md py-1 px-4 w-full'>
                                <div className={`${waiting?'animate-spin':''}`}>
                                    <img className="w-6 h-6 grey" src={add} alt="" />
                                </div>
                                <span className="text-sm">{waiting? "Guardando...": "Guardar"}</span>
                            </button>

                            
                        </form>
                        :
                        ''
                }
                    
        </div>
        
        {errores?.images ? <Alert>{errores.images}</Alert> : null}
        </div>
    )
}
export default memo(UploadLandig)