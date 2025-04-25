import { useRef, useState, useEffect } from "react"

import useAdmin from "/src/hooks/useAdmin"
import LabelSimple from "/src/components/admin/LabelSimple"

import edit from '/src/static/icons/edit.svg'
import iconDelete from '/src/static/icons/delete.svg'
import options from '/src/static/icons/options.svg'

import BlockSubHeader from "./BlockSubHeader"
import BtnsUpdate from "./BtnsUpdate"






export default function BlockItemOne({children, group, url, mutate, nameBlock, divEdit, styleName, icon, classOption='grey',  labelName='Nombre:'}) {

    const {
        update,  

    } = useAdmin()
    
    const [showOptions, setShowOptions] = useState(false)
    const [activeEdit, setActiveEdit] = useState(false)
    
    const [errores, setErrores] = useState({})
    const [stateUpdate, setStateUpdate] = useState(false)
    const [waitingUpdate, setWaitingUpdate] = useState(false)
    
    const nameRef = useRef()

    const handleSubmit = async e =>{
        
        e.preventDefault()
        const groupToUpdate = {
          _method: 'PUT',
          id: group.id,
          name: nameRef.current.value,
        }
        if(!waitingUpdate){
            update(url, groupToUpdate, setErrores, setStateUpdate, setWaitingUpdate)
        }
    }


    return (
        <div 
            className={`relative  font-poppins-regular flex justify-between items-center border mt-0.5 rounded-lg  overflow-hidden ${activeEdit?
                "bg-white border-cyanPrimary mt-4 mb-4 ":
                "bg-white hover:border-slate-400 "} 
                `}  
        >
            {
                activeEdit?
                <form 
                    className="flex flex-col justify-between  items-center flex-1 bg-white"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <BlockSubHeader
                        item={group}
                        itemName={nameBlock}
                    />
                        <div className='flex  flex-col items-center justify-around gap-2 flex-wrap w-full '>
                            {/* name */}
                            <LabelSimple
                                htmlfor="name"
                                name={labelName}
                                image={icon}
                                error={errores?.name}
                            >
                                <input 
                                type="text" 
                                id="name"
                                defaultValue={group?.name}
                                ref={nameRef}
                                />
                            </LabelSimple>
                        </div>
                        {
                            divEdit?divEdit:null
                        }
                        <BtnsUpdate
                            closeAction={setActiveEdit}
                        />
                        
                    
                </form>
                :
                <>
                    <div className='flex flex-col gap-x-2 text-slate-700  transition-all w-full rounded overflow-hidden'>
                        <div className={`relative flex items-center  justify-between w-full  ${styleName} flex-1  py-1`}>
                            <div className="flex items-center gap-x-2">
                                <span className=' px-4 text-sm'>
                                    {group?.id}
                                </span>
                                {group?.name}
                            </div>


                            <div 
                                className=' flex group/item flex-col justify-center items-center px-4 font-poppins-bold text-sm cursor-pointer'
                            >
                                
                                {
                                    showOptions?
                                    <div 
                                        className="absolute bg-slate-800 text-white shadow-md  font-normal opacity-100 transition-all rounded overflow-hidden  top-100  right-0"
                                        onMouseLeave={()=>{
                                            setShowOptions(false)
                                        }}
                                    >
                                        <ul className=" text-xs flex justify-center items-center">
                                            <li className="group/li hover:bg-slate-700 p-2 transition-all">
                                                <div className="flex justify-between items-center gap-2 w-20 ">
                                                    Eliminar
                                                    <img src={iconDelete} alt="save" className='w-4 h-4 white transition-all' />
                                                </div>
                                            </li>
                                            <li className="group/li  hover:bg-slate-700 p-2 transition-all"
                                                onClick={()=>{
                                                    setActiveEdit(true)
                                                    setShowOptions(false)
                                                }}
                                            >
                                                <div className="flex justify-between items-center gap-2 w-20 ">
                                                    Editar
                                                    <img src={edit} alt="save" className='w-4 h-4 white transition-all' />
                                                </div>
                                            </li>
                                            
                                        </ul>
                                    </div>
                                    :
                                    <div onClick={()=>setShowOptions(!showOptions)}>
                                        <img src={options} alt="save" className={`w-4 h-4 ${classOption}`} />
                                    </div>
                                }
                            </div>


                        </div>
                        <div className="">
                            {children}
                        </div>
                    </div>
                   
                </>
            }
        </div>
    )
}
