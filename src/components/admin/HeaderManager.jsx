import { Link } from "react-router-dom"
import { memo } from "react"
import add from '/src/static/icons/add.svg'

const HeaderManager =({name, urlNew})=> {
  
  return (
    <>
        <div className="flex justify-between items-center w-full px-4">
            <div>
            <p className="font-bold text-4xl text-slate-600  py-8">{name}</p>
            </div>
            {
                urlNew !== undefined ? 
                <Link
                to={urlNew}
                className="pl-1 pr-2 py-0.5 rounded-md border bg-green-500 hover:bg-green-600 text-white transition-all duration-200 cursor-pointer"
                >
                <div className="flex justify-center space-x-1 items-center">
                      <img 
                        className="w-6 h-6 grey"
                        src={add}
                        alt="" 
                      /> 
                    <span className="font-bold text-sm">Nuevo</span>
                </div>
                </Link>
                : ""
            }
            
            
        </div>
    </>
  )
}

export default memo(HeaderManager)
