import { useCallback, useEffect, useState } from "react"
import iconDelete from '/src/static/icons/delete.svg'
import { memo } from "react"

const ImagesShower = ({setDelete, images, url, edit = false})=> {

  const [toDelete, setToDelete] = useState([])

  const handleAddToDelete =  useCallback((image) => {
    
    if(!toDelete.find(element => element.name === image.name)){
      setToDelete(previos => [
        ...previos,
        image
      ],[image])
      
    }
  })
  useEffect(()=>{
    if(setDelete){
      setDelete(toDelete)
    }
  },[toDelete])
  return (
      <>
        {
          images && images?.length > toDelete?.length && (
            <ul className='flex gap-2 p-1 flex-wrap '>
              {images.map(img => !toDelete.find(element => element.name === img.name) && (
                <li 
                  className='relative center-r flex-shrink-0 ring-red-700 focus-within:border-red-700 focus-within:ring-4 flex-1 min-w-[100px] max-w-[150px] min-h-[100px] max-h-[150px] '
                  key={img.id}> 
                    <img 
                      className="w-full h-full object-contain "
                      src={url + img.name} 
                      alt={img.name} 
                    /> 
                    { 
                      edit && (
                        <button
                          type='button'
                          className='absolute focus:opacity-100 outline-none opacity-0 hover:opacity-100 h-full text-white transition-all flex justify-center gap-x-2 items-center bg-red-600 bg-opacity-70 w-full  ring-red-700 focus-within:border-red-700 focus-within:ring-4'
                          onClick={()=> handleAddToDelete(img)}
                        >
                          <img className="w-6 h-6 white" src={iconDelete} alt="" />
                        </button>
                      )
                    }
                </li>
              ))}
            </ul>
          )
        }
      </>
  )
}
export default memo(ImagesShower)
