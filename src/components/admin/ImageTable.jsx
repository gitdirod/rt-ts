import bag from '/src/static/icons/bag.svg'
import { memo } from 'react'

const ImageTable =({higth="40",url,images, count=false})=> {
  return (
    <>
      <div
        className="flex  items-center flex-1 z-0"
      >
        { 
          images.length ? 
            <div
              className="relative"
            >
              {
                count?
                <div className="absolute -top-2 -right-2 shadow-md font-bold flex justify-center items-center border border-white bg-opacity-80 backdrop-blur-sm bg-slate-800 text-white p-0.5 rounded-full h-4 w-4 text-xs">
                  {images?.length}
                </div>
                :
                ''
              }
              <img 
                className={`h-${higth} w-${higth}`}
                src={url + images[0]['name']} 
                alt={images[0]['name']} 
              />
            </div>
          : 
          <div className='flex justify-center items-center border h-20 w-20 rounded'> 
            <img 
                className="w-6 h-6 grey"
                src={bag}
                alt="" 
            /> 
          </div>
        }
      </div>
    </>
  )
}
export default memo(ImageTable)
