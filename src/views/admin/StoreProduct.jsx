import useStore from "../../hooks/useStore"
import { useEffect, useState, memo } from "react"
import { createRef } from "react"

import Alert from "/src/components/Alert"

import useAdmin from "../../hooks/useAdmin"
import UploadImage from "/src/components/admin/UploadImage"
import BlockHeader from "/src/components/admin/BlockHeader"

import LabelSimple from "/src/components/admin/LabelSimple"
import LinkBtn from "../../components/admin/LinkBtn"
import Btn from "../../components/admin/Btn"
import ModalViewRequest from "/src/components/admin/ModalViewRequest"

import iconBag from '/src/static/icons/bag.svg'
import iconCategory from '/src/static/icons/category.svg'
import iconWeight from '/src/static/icons/weightBlack.svg'
import iconSize from '/src/static/icons/sizeBlack.svg'
import iconText from '/src/static/icons/text.svg'
import iconImages from '/src/static/icons/images.svg'
import iconClose from '/src/static/icons/close.svg'
import iconAdd from '/src/static/icons/add.svg'
import iconSave from '/src/static/icons/save_filled.svg'
import iconDelete from '/src/static/icons/delete.svg'
import iconBarcode from '/src/static/icons/barcode.svg'
import iconItem from '/src/static/icons/item.svg'
import iconEnergy from '/src/static/icons/energyBlack.svg'
import iconTag from '/src/static/icons/tagBlack.svg'
import iconEye from '/src/static/icons/eye.svg'


const StoreProduct=()=> {
    const {
        create,
        handleModalViewRequest,
        handleModalStateRequest
    } = useAdmin()
    const {
        categories, 
        mutateProducts, 
        types,
        sizes,
        numbers
    } = useStore()
    const [checked, setChecked] = useState(1); 
    
    const nameRef = createRef()
    const categoryRef = createRef()
    const descriptionRef = createRef()
    const codeRef = createRef()
    const typeRef = createRef()
    // Opcionales
    const sizeRef = createRef()
    const weightRef = createRef()
    const numberRef = createRef()
    const[image, setImage]= useState([])

    const [errores, setErrores] = useState({})
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)

    const handleChange = (e) => {
        setChecked(!e)
    };
    const removeFile = (name)=>{
        setImage(files => files.filter(file => file.name !== name))
    }
    const handleSubmit = async (e)=> {
        e.preventDefault()
        
        const product = {
            name: nameRef.current.value,
            category: categoryRef.current.value,
            type: typeRef.current.value,
            description: descriptionRef.current.value,
            available: checked ? 1 : 0,
            code: codeRef.current.value.toUpperCase(),
            size: sizeRef.current.value.trim() !== "" ? sizeRef.current.value.toLowerCase() : "NADA",
            number_color: numberRef.current.value.trim() !== "" ? numberRef.current.value.toLowerCase() : "NADA",
            weight: weightRef.current.value.trim() !== "" ? weightRef.current.value.toLowerCase() : "NADA",
            images: image
        }

        create('products', product, setErrores, setState, setWaiting)
    }

    useEffect(()=>{
        if(state){
            mutateProducts()
            setState(false)
        }
        handleModalViewRequest(<ModalViewRequest text="Guardando..." icon={iconSave} spin={false}/> )
        handleModalStateRequest(waiting)
    },[waiting])

    
    
    return (
        <div className="flex flex-wrap flex-1">
            {/* items list */}
            <form 
            className=" overflow-y-hidden flex flex-col flex-1"
            onSubmit={handleSubmit}
            noValidate
            >

                <BlockHeader
                    name={  
                        <div className='flex items-center'>
                          <img src={iconItem} alt="save" className='w-8 h-8 gray pr-2' />
                            Nuevo producto
                        </div>
                        }
                >
                    <LinkBtn
                        to='/admin/inventory/products/'
                        icon={iconClose}
                        text='Cerrar'
                        imageColor='white'
                    />
                    <Btn
                        icon={iconSave}
                        text='Guardar'
                        style="bg-cyanPrimary"
                    />
                    
                </BlockHeader>
                
            <div className="overflow-y-auto flex-1 relative">
                <div className="absolute flex flex-col items-start w-full gap-4 lg:flex-row">
                    <div className="flex flex-col w-full max-w-md gap-y-2">
                        {/* name */}
                        <LabelSimple
                            htmlfor="name"
                            name="Nombre:"
                            image={iconBag}
                            error={errores.name}
                        >
                        <input 
                            type="text" 
                            id="name"
                            placeholder="Escribe un nombre."
                            ref={nameRef}
                        />
                        </LabelSimple>

                        {/* Code */}
                        <LabelSimple
                            htmlfor="code"
                            name="Código:"
                            image={iconBarcode}
                            error={errores.code}
                        >
                        <input 
                            type="text" 
                            id="code"
                            placeholder="El código es unico de cada producto."
                            ref={codeRef}
                        />
                        </LabelSimple>

                        {/* Category */}
                        <LabelSimple
                            htmlfor="category"
                            name="Categoría:"
                            image={iconCategory}
                            error={errores.category}
                        >
                        <select 
                            id="category"
                            name="category"
                            ref={categoryRef}
                        >
                            <option  value={""} >Seleccione una categoría</option>
                            {categories?.map((category)=> (<option className="text-slate-600" key={category.id} value={category.id} >  {category.name} "{category.group_name}" </option>))}
                        </select>
                        </LabelSimple>

                        {/* Tipo */}
                        <LabelSimple
                            htmlfor="type"
                            name="Tipo:"
                            image={iconTag}
                            error={errores.type ? errores.type[0] : null}
                        >
                        <select 
                            id="type"
                            name="type"
                            ref={typeRef}
                        >
                            <option value={""} >Selecciona un tipo</option>
                            {types?.map((type)=> (<option className="text-slate-600" key={type.id} value={type.id} >{type.name}</option>))}
                        </select>
                        </LabelSimple>

                        <LabelSimple
                            htmlfor="type"
                            name="Visible en tienda:"
                            image={iconEye}
                        > 
                            <div className="flex-1 flex justify-center items-center">
                                <label className="relative inline-flex cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={checked} onChange={()=>handleChange(checked)}/>
                                <div className="w-[200px] h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-[98px] after:transition-all  peer-checked:bg-green-500"></div>
                                </label>
                            </div>
                            {errores.available ? <Alert>{errores.available}</Alert> : null}
                        </LabelSimple>


                        <LabelSimple
                            htmlfor="type"
                            name="Descripción:"
                            image={iconText}
                            flex='flex flex-col'
                            error={errores.description}
                        > 
                            <textarea 
                                className="w-full rounded-lg text-slate-600 text-left  px-3 py-1 focus:text-green-500"
                                type="text" 
                                placeholder="Escribe una breve descripción del producto..."
                                rows={10} 
                                ref={descriptionRef} 
                            />
                        </LabelSimple>
                    </div>

                    <div className="flex flex-col w-full max-w-md gap-y-2 p-0.5">  

                <div 
                  className="flex flex-col items-start w-full max-w-md group border rounded-lg style-input-green bg-white text-slate-600"
                >
                    <UploadImage
                        setImages={setImage}
                        image={image}
                        max={4}
                    >
                        <label 
                        htmlFor="images"
                        className="flex justify-start items-center gap-x-2 py-1 text-slate-700' text-slate-600 px-1  transition-all duration-200 group-focus-[.bg-green-700]:text-green-500 "
                        >
                        <img className="w-5 h-5 grey group-focus-[.bg-green-700]:green" src={iconImages} alt="" />
                        Imagenes
                        </label>
                        <img className="w-5 h-5 grey group-focus-[.bg-green-700]:green" src={iconAdd} alt="" />

                    </UploadImage>
                      
                        {
                            image?.length > 0 ?
                            <div className="flex gap-2 flex-wrap px-1 py-1">
                            
                            {image?.map(file => (
                            <li 
                                className='relative flex  justify-center items-center flex-shrink-0 ring-red-700 focus-within:border-red-700 focus-within:ring-2 flex-1 min-w-[100px] max-w-[150px] max-h-[100px]'
                                key={file.preview}
                            >
                                <img 
                                    className="w-full h-full object-contain"
                                    src={file.preview} 
                                    alt={file.name} 
                                    onLoad={()=>{
                                    URL.revokeObjectURL(file.preview)
                                    }}
                                /> 
                                <button
                                    type='button'
                                    className='absolute focus:opacity-100 outline-none opacity-0 hover:opacity-100 h-full text-white transition-all flex justify-center gap-x-2 items-center bg-red-600 bg-opacity-70 w-full  ring-red-700 focus-within:border-red-700 focus-within:ring-2'
                                    onClick={()=> removeFile(file.name)}
                                >
                                    <img className="w-6 h-6 white" src={iconDelete} alt="" />
                                    
                                </button>
                            </li>
                            ))}
                        </div>
                        :
                        <span 
                            className="w-full p-1 border-t text-center text-slate-500 text-sm">
                                Agrega imagenes de cualquier dimensión.
                        </span>
                        }
                        {errores.images ? <Alert>{errores.images}</Alert> : null}
                </div>
                        

                        {/* Agregar campos opcionales */}
                        {/* size */}
                        <LabelSimple
                            htmlfor="size"
                            name="Dimensiones:"
                            image={iconSize}
                            error={errores.size}
                        >
                            <select 
                                id="size"
                                name="size"
                                ref={sizeRef}
                            >
                                <option value={""} >Seleccione un tamaño</option>
                                {sizes?.map((size)=> (<option className="text-slate-600" key={size.id} value={size.name} >{size.name}</option>))}
                            </select>
                        </LabelSimple>

                        {/* Peso */}
                        <LabelSimple
                        htmlfor="weight"
                        name="Peso:"
                        image={iconWeight}
                        error={errores.weight}
                        >
                        <input 
                            type="text" 
                            id="weight"
                            placeholder="Ingresa peso del producto en caja."
                            ref={weightRef}
                        />
                        </LabelSimple>

                        {/* Numerod de colores */}
                        <LabelSimple
                        htmlfor="number"
                        name="Potencia:"
                        image={iconEnergy}
                        error={errores.number}
                        >
                        <select 
                            id="number"
                            name="number"
                            ref={numberRef}
                        >   <option value={""} >Ingresa la potencia</option>
                            {numbers?.map((number)=> (<option className="text-slate-600" key={number.id} value={number.name} >{number.name}</option>))}
                        </select>
                        </LabelSimple>

                    </div>
                </div>
            </div>    
            </form>
            
        </div>
  )
}

export default memo(StoreProduct)