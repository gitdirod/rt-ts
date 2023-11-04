import { Link } from "react-router-dom"
import { memo } from "react"
import search from '/src/static/icons/search.svg'
import close from '/src/static/icons/close.svg'
import edit from '/src/static/icons/edit.svg'


const HeaderDescription=({itemName, item, functionEdit, urlExit, urlShow})=> {
    
  return (
    <div className="sticky top-0 flex justify-between items-center px-4 py-4 bg-slate-50">
        <h3 className="text-3xl font-bold text-slate-600 ">{itemName}</h3>
        <div className="flex justify-between space-x-2">
            {
                urlShow?
                    <a 
                        href={"/product/"+item.name +'?code='+item.code} target="_blank"
                        className="px-2 bg-sky-500  pr-3 py-1 rounded-md text-white hover:bg-sky-600 transition-all duration-200 cursor-pointer"
                    >
                        <div className="flex justify-center space-x-1 items-center">
                            <img className="w-6 h-6 grey" src={search} alt="" />
                            <span className="text-sm font-bold">Ver en tienda</span>
                        </div>
                    </a>
                    :
                    ""

            }
            {
                functionEdit?
                    <div 
                        onClick={()=>functionEdit(item)}
                        className="px-2 bg-green-500  pr-3 py-1 rounded-md text-white hover:bg-green-600 transition-all duration-200 cursor-pointer"
                    >
                        <div className="flex justify-center space-x-1 items-center">
                            <img className="w-6 h-6 grey" src={edit} alt="" />
                            <span className="text-sm font-bold">Editar</span>
                        </div>
                    </div>
                :
                ""
            }
            <Link
                className="flex justify-center items-center bg-slate-600 pr-3 py-0.5 rounded-md text-white hover:text-white hover:bg-slate-700 transition-all duration-200"
                to={urlExit}
            >   
                <div className="flex justify-center space-x-1 items-center">
                <img className="w-6 h-6 grey" src={close} alt="" />
                <span className="text-sm font-bold">Atras</span>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default memo(HeaderDescription)
