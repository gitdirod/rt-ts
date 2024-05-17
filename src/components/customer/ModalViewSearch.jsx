import { memo, useState } from "react"
import useStore from "/src/hooks/useStore"
import { formatearDinero } from "/src/helpers"
import { useNavigate } from "react-router-dom"
import close from '/src/static/icons/close.svg'
import iconClose from '/src/static/icons/seller/close.svg'
import iconSearch from '/src/static/icons/customer/search.svg'
import iconSearchBlack from '/src/static/icons/search.svg'
import { urlsBackend } from "/src/data/urlsBackend"
import Btn from "/src/components/admin/Btn"


const ModalViewSearch = ({closeModal})=> {

  const navigate = useNavigate()
  const [inputText, setInputText] = useState('')
  const {
    categories,
    types,
    products,
  } = useStore()

  const filteredByName = products?.filter(pro => inputText != '' && 
    pro.available == true && 
    ( pro.name.toUpperCase().replace(/\s+/g, '').includes(inputText.toUpperCase().replace(/\s+/g, '')) || 
      pro.code.toUpperCase().replace(/\s+/g, '').includes(inputText.toUpperCase().replace(/\s+/g, ''))
    )
  ).map(filteredPro => (filteredPro))
    
  const goTo = (url) =>{
    closeModal()
    navigate(url)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="max-h-[calc(100vh-10vh)] overflow-x-hidden overflow-auto rounded-lg md:w-[700px]">
       <div className="relative gap-4 center-r p-2 font-light bg-slate-800 text-white text-2xl">
            <img src={iconSearch} className="w-8" alt="buscar" />
            <span className="text-base md:text-xl font-poppins-regular">Buscar productos</span>
            <Btn
                style='md:absolute bg-white right-2 '
                icon={iconClose}
                imageColor
                action={()=>{
                    closeModal()
                }}
            />
        </div>
      <div className="flex flex-col relative text-slate-700  bg-slate-100 font-poppins-regular w-full h-full max-h-[calc(100vh-10vh-4rem)]">
        
        <div className=" flex flex-col w-full p-2 gap-1">
          <div className=" flex  gap-x-2 items-center bg-white border rounded-lg w-full p-2">
            <img className="w-5 h-5 cyan" src={iconSearchBlack} alt="" />
            <input 
              className=" font-poppins-bold rounded-none" 
              placeholder="¿Qué quieres buscar?"
              type="text"
              onChange={(e)=>setInputText(e.target.value)}
            />
          </div>
          <div className="text-white">
            <ul className="flex gap-x-4 flex-wrap justify-start items-center rounded-lg bg-slate-700 p-1">
              <span className="font-poppins-bold">Categorías:</span>
              { categories?.map(cat=> cat.show === true && (
                  <li 
                  onClick={()=>goTo(`/store/products/?cat=${cat.name}`)}
                  key={cat.id}
                  className="hover:scale-110 transition-all cursor-pointer "
                >
                  <span className="">{cat.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-white mb-2">
            <ul className=" flex gap-x-4 flex-wrap justify-start items-center bg-cyanPrimary p-1 rounded-lg ">
              <span className="font-poppins-bold">Etiquetas:</span>
              { types?.map(typ=> typ.show === true && (
                <li 
                  onClick={()=>goTo(`/store/products/?typ=${typ.name}`)}
                  key={typ.id}
                  className="hover:scale-110  transition-all cursor-pointer "
                >
                  <span>{typ.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="relative overflow-y-auto px-1"
        >
          <div className=" ">

          {/* Busqueda por Nombre */}
        {
          filteredByName?.length > 0 && (
          <>
          <div className="sticky top-0 text-white font-poppins-bold rounded-lg bg-slate-700 px-4 w-full ">Productos:</div>
          {
            filteredByName?.map(filteredPro => (
              <div 
                key={filteredPro.id}
                className=" group flex justify-start items-center my-0.5 gap-x-4  bg-white rounded-lg border hover:border-slate-300 overflow-hidden cursor-pointer  transition-all"
                onClick={()=>goTo(`/store/product/${filteredPro.name}?code=${filteredPro.code}`)}
              >
                <img 
                  className="w-14 h-14"
                  src={urlsBackend.PRODUCT_IMAGE + filteredPro?.images[0]?.name} 
                  alt="imagen" 
                />
                
                <div className="flex flex-col font-extralight">
                  <span className=" font-poppins-semibold capitalize-first">{filteredPro.name}</span>
                  <div className="flex text-sm flex-col md:flex-row gap-x-8">
                    <span>Categoria: {filteredPro.category?.name}</span>
                    <span>Código: {filteredPro.code}</span>
                  </div>
                </div>
                <div className="flex flex-1  font-poppins-bold text-xl justify-end px-4 items-center ">
                  <span>{formatearDinero(filteredPro.price)}</span>
                </div>
              </div>
            ))
          }
          <div className=" w-full flex justify-end items-center mt-1 mb-4 cursor-pointer">
            <div 
              className="font-bold rounded-sm hover:scale-110 text-cyanPrimary  transition-all "
              onClick={()=>goTo(`/store/products/?search=${inputText}`)}
            >
              Ver todo
            </div>
          </div>
        </>
        )}

          </div>
          
          
        </div>
      </div>
    </div>
  )
}


export default memo(ModalViewSearch)