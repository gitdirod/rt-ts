import IsLoading from '../../components/store/common/IsLoading'
import BlockHeader from '/src/components/admin/BlockHeader'
import iconUser from '/src/static/icons/user.svg'
import iconEmail from '/src/static/icons/email.svg'
import iconPhone from '/src/static/icons/phone.svg'
import { useAuth } from '/src/hooks/useAuth'


export default function IndexGroup (){
    const {users} = useAuth({
        middleware: 'auth',
        url: '/admin'
      })

    if(users === undefined) return(<IsLoading/>)
    return (
        <div className='overflow-y-hidden flex flex-col flex-1'>
            <BlockHeader
                name={
                    <div className='flex'>
                    <img src={iconUser} alt="save" className='w-8 h-8 pr-2' />
                        Usuarios ({users?.length})
                    </div>
                }
            >
        
            </BlockHeader>
            <div className="flex flex-1 relative w-full overflow-hidden pb-5 overflow-y-auto">
                <div className='w-full absolute'>

                    
                    <div className='pb-1 pr-1 flex flex-col gap-0.5'>
                        {users?.map(user => (
                            <div
                                key={user.id}
                            >
                                <BlockUser
                                    user={user}
                                >
                                    
                                </BlockUser>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

const BlockUser=({user})=>{
    return(
        <div className='flex w-full border gap-x-1 justify-between p-2 transition-all bg-white rounded-lg text-slate-700 hover:border-slate-500 cursor-pointer'>
            <div className='flex flex-col'>
                <div className='flex items-center gap-1'>
                    <span className='font-extrabold'>{user?.name}</span>
                    <span className='font-bold'><TagRole role={user?.role}/></span>
                </div>
                <div className='flex gap-x-1 items-center'>
                    <img src={iconEmail} alt="save" className='w-5 h-5 gray' />
                    <span className=''>{user?.email}</span>
                    {/* {user?.phone} */}
                </div>
                <div className='flex gap-x-1 items-center'>
                    <img src={iconPhone} alt="save" className='w-5 h-5 gray' />
                    <span className=''>099 109 5204</span>
                </div>
            </div>
            
        </div>
    )
}

const TagRole=({role=''})=>{
    return(
        <span className={`${role==='admin'?'bg-green-500':
        role==='coor'?'bg-sky-500':
        role==='user'?'bg-slate-600':''
    } p-1 text-white rounded-md capitalize text-xs`}>{role}</span>
    )
}
