import { Link } from "react-router-dom"
import { memo } from "react"
const HeaderShower =({NameSection})=> {
    return (
        <div className="flex justify-between items-center px-4">
            <div>
                <p className="font-bold text-2xl text-slate-600  py-3">{NameSection}</p>
            </div>
            <Link
                to={'/admin/products/product'}
                className="pr-3 py-0.5 rounded-md bg-green-500 text-white hover:bg-green-400 transition-all duration-200"
            >
                <div className="flex justify-center space-x-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                    <span className="text-sm font-bold">Nuevo</span>
                </div>
            </Link>
        </div>
    )
}
export default memo(HeaderShower)
