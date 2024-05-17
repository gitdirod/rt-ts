import {useCallback, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import { useState } from 'react'
import Alert from '/src/components/Alert'
import { memo } from 'react'
import add from '/src/static/icons/add.svg'
import imgDelete from '/src/static/icons/delete.svg'
import ok from '/src/static/icons/ok.svg'



const UploadPayment =({setImages, errores, max = 1})=> {
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])

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
 

  return (
    <div className='text-white w-full' >
        <div className='w-full flex-wrap'>
            {
                files.length == 0?
                <div 
                    className='border p-1 px-4 rounded-lg cursor-pointer bg-pinkPrimary'
                    {...getRootProps()}
                >
                    <input 
                        {...getInputProps()}
                        id="images"
                        className='w-full'
                    />
                    {
                        isDragActive ?
                            <p className='font-poppins-semibold transition-all duration-200'>
                                Suelte aquí
                            </p> 
                            :
                            <div className='flex items-center font-poppins-regular  transition-all duration-200'>
                                <img 
                                    className="w-6 h-6 white"
                                    src={add}
                                    alt="" 
                                />
                                Arrastre y suelte una imagen del comprobante bancario, o haga clic para seleccionar
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
                        className='relative flex flex-col justify-center items-center flex-shrink-0 group  rounded-sm border p-1 bg-white'
                        key={file.preview}
                    >
                        <img 
                            className='h-20 rounded-sm'
                            src={file.preview} 
                            alt={file.name} 
                            onLoad={()=>{
                            URL.revokeObjectURL(file.preview)
                            }}
                        /> 
                        <button
                            type='button'
                            className='absolute opacity-0 hover:opacity-100 h-full bg-white flex justify-center items-center bg-opacity-80 w-full'
                            onClick={()=> removeFile(file.name)}
                        >
                            <img className="w-10 h-10 grey" src={imgDelete} alt="" />
                            
                        </button>
                    </li>
                ))}
            
            </ul>
            {
                files.length && (
                    <div className='flex justify-center'>
                        <div className='flex items-center text-white bg-cyanPrimary rounded-md py-1 text-center w-fit px-4'>
                            <img className="w-6 h-6 white px-0.5" src={ok} alt="" />
                            Comprobante cargado
                        </div>
                    </div>
                )
            }
                
      </div>
      
      {errores.images ? <Alert>{errores.images}</Alert> : null}
    </div>
  )
}
export default memo(UploadPayment)