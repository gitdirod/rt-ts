import { memo } from "react"
import iconError from '/src/static/icons/admin/error.svg'

const AlertAdmin = ({children})=> {
  return (
    <div className="center-r w-full gap-1 text-sm text-red-500  border border-red-500 rounded-lg p-0.5 mt-0.5 font-poppins-regular">
        <img src={iconError} className="w-3" alt="error" />
        {children}
    </div>
  )
}
export default memo(AlertAdmin)
