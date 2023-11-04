import {useCallback, memo} from 'react'
import {useDropzone} from 'react-dropzone'

const UploadImages =({children, max = 1, setImages, images, maxMessage=false})=> {

    const onDrop = useCallback((acceptedFiles) => {

        if(acceptedFiles?.length && images?.length < max ){ 
            const toSave = acceptedFiles.filter(fileAccepted => !images.some(file => file.name === fileAccepted.name))
            setImages(previosFiles => [
                ...previosFiles,
                ...toSave?.map(file => {
                        return Object.assign(file, { preview: URL.createObjectURL(file) })
                    })
            ])}
        
    })
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, 
        accept: {
        'image/*':[]
        },
        maxSize: 10000 * 10000,
        maxFiles: max,
    })
    if(maxMessage && images?.length >= max){
        return(maxMessage)
    }
    
    return (
        <div 
            className='center-r h-full cursor-pointer group outline-none '
            {...getRootProps()}
        >
            <input 
                {...getInputProps()}
                id="images"
            />
            {
                isDragActive ?
                    <div className='w-full px-2 transition-all'>
                        Suelta aquí
                    </div> 
                :
                    <div className='w-full center-r transition-all'>
                        {children}
                    </div>
            }
        </div>
    )
}
export default memo(UploadImages)