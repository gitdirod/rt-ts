export default function BlockHeader({children, name, code='', middle=null}) {
    return (
            <div
                className='w-full mb-1 border bg-white text-slate-700 rounded-lg relative'
            >
                <div
                    className='flex flex-col md:flex-row justify-between items-center gap-1 md:gap-2 bg-gradient-to-r rounded  px-2 py-1'
                >
                    <div
                        className={` ${middle?'md:w-1/3':'md:w-1/2'} w-full flex flex-col font-poppins-extrabold text-xl md:text-2xl`}
                    >
                        {name}
                        {code?<span className='text-xs'>Cód. {code}</span>:''}
                        
                    </div>
                    {middle && (
                        <div className="w-full md:w-1/3 h-full flex text-xl font-poppins-extrabold">
                            {middle}
                        </div>
                    )}
                    <div className={`${middle?'w-full md:w-1/3':'w-full md:w-1/2'} center-r md:justify-end gap-x-2`}>
                        {children}
                    </div>
                </div>
            </div>
        )
}
