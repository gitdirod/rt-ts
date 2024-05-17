import { 
    memo,
    useEffect, 
    useState 
} from "react"
import useStore from "/src/hooks/useStore"
import useAdmin from "/src/hooks/useAdmin"
import { useAuth } from "/src/hooks/useAuth"
import { toast } from "react-toastify"
import iconHartBlack from '/src/static/icons/heartBlack.svg'
import iconHartBlackFilled from '/src/static/icons/heartBlackFilled.svg'


const ButtonLikeHart =({productId, size = '6'})=> {

    const {likes, mutateLikes} = useStore()
    const [inLike, setInLike] = useState(0)

    const [errores, setErrores] = useState({})
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const { user } = useAuth({middleware: 'guest'})

    const {
        create,
    } = useAdmin()

    const sendLike = () => {
        if(user?.email_verified_at){
            const updateLike = {
                product_id: productId,
            }
            create('likes', updateLike, setErrores, setState, setWaiting)
            
        }else if(user?.email_verified_at === null){
            toast.error(<span className="font-bold">¡Verificar cuenta!</span>, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else{
            
            toast.error(<span className="font-poppins-bold">¡Primero debes iniciar sesión!</span>, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTimeout(()=>{
                navigate('/auth/login/')
            }, 5000)
            
        }
    }
    useEffect(()=>{
        if(likes?.some( item =>  item.product_id === productId )){
            setInLike(true)
        }else{
            setInLike(false)
        }
    }, [likes])

    useEffect(()=>{
        if(state){
          mutateLikes()
          setState(false)
        }
      },[waiting])
    

    return (
        <div 
            className="center-r group/buttom py-2 w-full  cursor-pointer text-white font-poppins-bold rounded-lg bg-pinkPrimary"
            onClick={()=>{sendLike()}}
        >
            <div className=" flex gap-x-2 group-hover/buttom:scale-110 transition-all">
                <span>Me gusta</span>
                <div className=" center-r cursor-pointer">
                    <img src={inLike?iconHartBlackFilled:iconHartBlack} className={`w-6 h-6 white ${waiting && 'animate-pulse'}`} alt="iconHart" />
                </div>
            </div>
      </div>
  )
}

export default memo(ButtonLikeHart)