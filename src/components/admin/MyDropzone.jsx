import {
  useCallback, 
  useEffect, 
  memo,
  useState
} from 'react'
import {useDropzone} from 'react-dropzone'
import useAdmin from "/src/hooks/useAdmin"
import Alert from '/src/components/Alert'


const MyDropzone =({errores, max = 10, textPut="Arrastra y suelta almenos una imagen aquí, o click para seleccionar" })=> {
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])
  // const {handleSetImagesProduct} = useAdmin()

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
        handleSetImagesProduct(files)
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
    handleSetImagesProduct(files)
  },[files])
  


  return (
    <div className='text-slate-500' >
      <div className='border bg-white rounded-md p-2 w-full flex-wrap hover:shadow hover:shadow-green-200'>
        <div {...getRootProps()}
          className=' cursor-pointer'
        >
          <input 
            {...getInputProps()}
            id="images"
            className='w-full'
          />
          {
            isDragActive ?
              <p className='font-semibold text-neutral-400 hover:text-slate-500  transition-all duration-200'>
                Suelta aquí
              </p> 
              :
              <p className='font-semibold text-neutral-400 hover:text-slate-500  transition-all duration-200'>
                {/* Arrastra y suelta almenos una imagen aquí, o click para seleccionar */}
                {textPut}
              </p>
          }
        </div>
        {/* Preview */}
        <ul className='mt-4 flex justify-center items-end 2xl:justify-center gap-x-4 gap-y-1 shrink-1 flex-wrap'>
          {files.map(file => (
          <li 
            className='relative group 2xl:w-48 w-28 flex flex-col justify-center items-center flex-shrink-0'
            key={file.preview}
          >
              <img 
                className='2xl:w-48 2xl:h-48 w-28 h-28 rounded-md shadow'
                src={file.preview} 
                alt={file.name} 
                onLoad={()=>{
                  URL.revokeObjectURL(file.preview)
                }}
              /> 
              <button
                type='button'
                className='absolute opacity-0 flex hover:opacity-100 transition-all flex-col justify-center items-center bg-red-600 bg-opacity-60 rounded-md text-white h-full w-full'
                onClick={()=> removeFile(file.name)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10">
                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                  </svg>
                <span className="text-xl font-bold">Eliminar</span>
              </button>
          </li>
          ))}
        </ul>
      </div>
      
      {errores.images ? <Alert>{errores.images}</Alert> : null}
    </div>
  )
}
export default memo(MyDropzone)