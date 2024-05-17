import { 
    memo,
    useEffect, 
    useState 
} from "react"
import useStore from "/src/hooks/useStore"
import useAdmin from "/src/hooks/useAdmin"
import { useAuth } from "/src/hooks/useAuth"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import iconHartBlack from '/src/static/icons/heartBlack.svg'
import iconHartBlackFilled from '/src/static/icons/heartBlackFilled.svg'


const LikeHart =({productId, size = 'w-6'})=> {
    const navigate = useNavigate()
    const {
        create,
    } = useAdmin()

    const { user } = useAuth({middleware: 'guest'})
    const {likes, mutateLikes} = useStore()
    const [inLike, setInLike] = useState(0)

    const [errores, setErrores] = useState({})
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)

    const sendLike = () => {
        if(user?.email_verified_at){
            const updateLike = {
                product_id: productId,
            }
            create('likes', updateLike, setErrores, setState, setWaiting)
            // create('products', product, setErrores, setState, setWaiting)
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
            
            toast.error(<span className="font-bold">¡Primero debes iniciar sesión!</span>, {
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
        <div className=" center-r cursor-pointer"
            onClick={sendLike}
        >
            <img src={inLike?iconHartBlackFilled:iconHartBlack} className={`${size} ${inLike?'pink':'grey'} ${waiting && 'animate-pulse'}`} alt="iconHart" />
        </div>
  )
}

export default memo(LikeHart)
