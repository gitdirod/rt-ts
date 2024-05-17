import {useCallback, useEffect, useState, memo} from 'react'
import useStore from '/src/hooks/useStore'
import {useDropzone} from 'react-dropzone'
import useAdmin from "/src/hooks/useAdmin"
import Alert from './Alert'
import iconSave from '/src/static/icons/save_filled.svg'
import iconCash from '/src/static/icons/cash.svg'
import iconDelete from '/src/static/icons/delete.svg'
import ModalViewRequest from './admin/ModalViewRequest'


const AddPayment =({orderId, max = 1})=> {
  const {
    create,
    handleModalViewRequest,
    handleModalStateRequest
  } = useAdmin()
  const {mutateSoldOrders} = useStore()

  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])
  const [imagesPayment, setImagesPayment] = useState([])

  const [errores, setErrores] = useState({})
  const [state, setState] = useState(false)
  const [waiting, setWaiting] = useState(false)

  useEffect(()=>{
    if(state){
      mutateSoldOrders()
      setState(false)
    }
    handleModalViewRequest(<ModalViewRequest text="Guardando..." icon={iconSave} spin={false}/> )
    handleModalStateRequest(waiting)
  },[waiting])

  const handleSubmit = async e =>{
    e.preventDefault()
    const payment = {
      sold_order_id: orderId,
      image: imagesPayment[0]
    }
    create('sold-order-payments', payment, setErrores, setState, setWaiting)
  }

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {

    if(acceptedFiles?.length && files <= max){ 
        const toSave = acceptedFiles.filter(fileAccepted => !files.some(file => file.name === fileAccepted.name))
        setFiles(previosFiles => [
          ...previosFiles,
          ...toSave.map(file => {
              return Object.assign(file, { preview: URL.createObjectURL(file) })
            })
        ])
        setImagesPayment(files)
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
    setImagesPayment(files)
  },[files])
  


  return (
    <form 
        className="w-full  relative text-slate-700 font-poppins-regular"
        onSubmit={handleSubmit}
        noValidate
        
    >
      <div className='px-2 pt-5 pb-1 w-full bg-white' >
          <div 
              className='font-poppins-bold flex gap-x-2 px-2'
          >
              <img className="w-6 h-6 grey" src={iconCash} alt="icon" />
              Agregar pago
          </div>
          <div className='center-c p-2 border bg-white  rounded-lg text-center px-10 w-full flex-wrap'>
            <div className='w-full' {...getRootProps()}>
              <input 
                {...getInputProps()}
                id="images"
                className='w-full'
              />
              {
                !imagesPayment?.length > 0 && (
                  <div className='font-poppins-semibold hover:scale-105  transition-all cursor-pointer'>
                    { isDragActive ? <span>Suelta aquí</span> :<span>Arrastra y suelta una imagen aquí, o click para seleccionar</span> }
                  </div>
                )
              }
              
            </div>
              {/* Preview */}
              <ul className='center-r 2xl:justify-center gap-x-4 gap-y-1 shrink-1 flex-wrap '>
                {files?.map(file => (
                <li 
                  className='relative center-c overflow-hidden group rounded-lg 2xl:w-48 w-28  flex-shrink-0 '
                  key={file.preview}
                >
                    <img 
                      className='2xl:w-48 2xl:h-48 w-28 h-28'
                      src={file.preview} 
                      alt={file.name} 
                      onLoad={()=>{
                        URL.revokeObjectURL(file.preview)
                      }}
                    /> 
                    <button
                      type='button'
                      className='absolute center-c opacity-0 hover:opacity-100 transition-all  bg-red-500 bg-opacity-80 text-white h-full w-full'
                      onClick={()=> removeFile(file.name)}
                    >
                      <img src={iconDelete} className='w-10 h-10 white' alt="" />
                      <span className="text-lg font-poppins-bold">Eliminar</span>
                    </button>
                </li>
                ))}
              </ul>
          </div>
            {
              files?.length>0 && (
                <button 
                  type='submit'
                  className='center-r group/buttom w-full my-1 bg-cyanPrimary rounded-lg text-white py-1 cursor-pointer '
                >
                <span className=' group-hover/buttom:scale-110 transition-all'>Guardar</span>
                </button>
              )
            }
    
    {errores.images ? <Alert>{errores.images}</Alert> : null}
      </div>
    </form>
  )
}
export default memo(AddPayment)