import {memo} from 'react'
import useStore from '/src/hooks/useStore'
import iconCart from '/src/static/icons/cartBlack.svg'

const BadgeCart=()=> {

    const {
        order
    } =useStore()


    return (
        <div 
            className="relative w-6 cursor-pointer"
        >

            <img className=" grey " src={iconCart} alt=""/>
            {
                order?.length > 0 && (
                    <div 
                        className="absolute center-r w-5 h-5 text-xs font-bold text-white bg-cyanPrimary border border-white rounded-full -top-4 right-0"
                    >
                        {order?.length}
                    </div>
                )
            }
        </div>
    )
}
export default memo(BadgeCart)
