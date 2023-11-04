import { memo } from "react"

const Alert = ({children})=> {
  return (
    <div className="border-l-4 border-l-red-600 w-full text-left  text-sm my-0.5 bg-red-500 text-white px-2 shadow-sm border border-red-500">
        {children}
    </div>
  )
}
export default memo(Alert)
