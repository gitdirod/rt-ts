import {useCallback, useEffect, memo, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Alert from '/src/components/Alert'
import imgImage from '/src/static/icons/images.svg'



const UploadIcon =({setIcon, errores, max = 1})=> {
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
        setIcon(files)
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
    setIcon(files)
  },[files])
  


  return (
    <div className='text-slate-500' >
      <div className=' flex-wrap w-10 h-10'>
        {
          files.length ===0 ?
          <div 
            className='w-full h-full flex justify-center items-center border hover:border-green-500 rounded-md cursor-pointer bg-white'
            {...getRootProps()}
          >
          <input 
            {...getInputProps()}
            id="images"
            className='w-full'
          />
          {
            isDragActive ?
              <div className='font-semibold text-neutral-400 hover:text-slate-500  transition-all duration-200'>
                Suelta aquí
              </div> 
              :
              <div className='font-semibold text-sm text-neutral-400 hover:text-slate-500  transition-all duration-200'>
                PNG
              </div>
          }
        </div>
        :
        ""
        }
        {/* Preview */}
        <ul className='flex justify-center items-end md:justify-start gap-x-4 shrink-1 flex-wrap'>
          {files.map(file => (
          <li 
            className='relative flex flex-col justify-center items-center flex-shrink-0 group h-10 w-10  rounded-md border bg-white'
            key={file.preview}
          >
              <img 
                className='w-10 h-10'
                src={file.preview} 
                alt={file.name} 
                onLoad={()=>{
                  URL.revokeObjectURL(file.preview)
                }}
              /> 
              <button
                type='button'
                className='absolute flex h-full  opacity-0 hover:opacity-100 transition-all bg-black justify-center gap-x-2 items-center text-red-500 bg-opacity-80 rounded-md p-0.5 w-full'
                onClick={()=> removeFile(file.name)}
              >
                  <img className="w-6 h-6 grey" src={imgImage} alt="" />
                
              </button>
          </li>
          ))}
        </ul>
      </div>
      
      {errores.images ? <Alert>{errores.images}</Alert> : null}
    </div>
  )
}
export default memo(UploadIcon)