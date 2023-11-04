import { useAuth } from "/src/hooks/useAuth"
import { adminViews } from "/src/data/pages"
import { storeViews } from "/src/data/pages"
import { Link } from 'react-router-dom'



export default function SidebarAdmin() {
  const {user} = useAuth({
    middleware: 'auth',
    url: '/admin'
})


return (
    <div className='flex  border-r shadow bg-white'>
        <div className='w-fit p-1'>
        {
            storeViews?.map(page=>
                {
                    const styleSection = location.pathname.startsWith(page.urlMain)
                    ?
                    "flex flex justify-center items-center h-10 font-poppins-semibold rounded-t-lg  border border-transparent bg-slate-800 text-white shadow border-b border-b-slate-500 p-1 w-[140px]":
                    "flex flex justify-center items-center h-10 font-poppins-regular hover:bg-slate-200 border border-transparent hover:border-slate-400 hover:shadow  transition-all rounded-lg p-1 w-[140px]"
                    const styleIcon = location.pathname.startsWith(page.urlMain) ? "w-6 h-6 white transition-all": "w-5 h-5 gray transition-all"
                    const isPage = location.pathname.startsWith(page.urlMain)

                    return(
                        (
                            <div
                                className={` ${isPage?'shadow bg-slate-700':''} rounded-lg  my-1 overflow-hidden`} 
                                key={page.id}
                            >
                                <Link
                                    to={page.url}
                                >
                                    <div className={styleSection}>
                                        <img src={'/iconos/'+page.image+'.svg'} className={styleIcon} alt="" />
                                        <span className='text-xs w-full text-center'>{page.name}</span>
                                    </div>
                                </Link>
                                <div className=' rounded-b-lg '>
                                {
                                    adminViews?.map(view=>{
                                        if(view.page_id === page.id && isPage){
                                            const styleSpan = location.pathname.startsWith(view.url)?
                                            "text-xs text-green text-yellow-500 font-poppins-bold"
                                            :
                                            "text-xs text-white font-poppins-regular"
                                            
                                            return(
                                                <div key={view.id} className="py-1 hover:bg-slate-600  transition-all ">
                                                    <Link
                                                        to={view.url}
                                                    >
                                                        <div className='group flex flex-col justify-center text-start items-start h-8 px-2 '>
                                                            <span className={styleSpan}>{view.name}</span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        }  
                                    }
                                    )
                                }

                                </div>
                            </div>
                        )
                    )
                }
            )
        }
        </div>
    </div>
)
}
