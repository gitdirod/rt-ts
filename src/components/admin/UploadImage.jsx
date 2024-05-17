import {useCallback, memo} from 'react'
import {useDropzone} from 'react-dropzone'

const UploadImage =({children, max = 1, setImages, image, isBlock=false})=> {

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        // Do something with the files

        if(acceptedFiles?.length && image?.length < max ){ 
            const toSave = acceptedFiles.filter(fileAccepted => !image.some(file => file.name === fileAccepted.name))
            setImages(previosFiles => [
            ...previosFiles,
            ...toSave?.map(file => {
                return Object.assign(file, { preview: URL.createObjectURL(file) })
                })
            ])
            // setImages(files)
        }
        
    })
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, 
        accept: {
        'image/*':[]
        },
        maxSize: 10000 * 10000,
        maxFiles: max,
        
    })
    if(isBlock && image?.length >= max){
        return null
    }
    return (
        <div className='text-sm text-slate-600 w-full h-full p-0.5 rounded-lg' >
            <div className='w-full flex-wrap h-full  '>
                <div 
                    className='flex h-full justify-between items-center cursor-pointer focus:bg-green-5 00 outline-none group '
                    {...getRootProps()}
                >
                    <input 
                        {...getInputProps()}
                        id="images"
                        className='w-full border focus:opacity-100'
                    />
                    {
                        isDragActive 
                        ?
                        <p className='px-2 font-semibold transition-all duration-200 '>
                            Suelta aquí
                        </p> 
                        :
                        <div className='flex w-full justify-between flex-1  items-center text-center  transition-all duration-200  '>
                            {children}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default memo(UploadImage)