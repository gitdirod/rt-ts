import {memo} from 'react'
import { useAuth } from "/src/hooks/useAuth"
import useStore from '/src/hooks/useStore'
import useAdmin from '/src/hooks/useAdmin'
import ModalViewVerify from './customer/ModalViewVerify'


const VerificationEmail=()=> {

    const {user} = useAuth({middleware: 'guest'})
    const {handleClickModalVerify}= useStore()

    const {
        handleModalStateComponent,
        handleModalViewComponent,
        handleCloseModals
    } = useAdmin()

    const handleModal = ()=>{
        handleClickModalVerify()
    }
    
    return (
        
    <>
        {
            user?.email_verified_at === null && (
                <div
                    className="bg-yellow-500  text-white shadow-md w-full center-r text-center cursor-pointer"
                    onClick={()=>{
                        // handleModal()
                        handleModalStateComponent(true)
                        handleModalViewComponent(<ModalViewVerify closeModal={handleCloseModals}/>)
                    }}
                >
                    <p
                        className=''
                    >
                        Cuenta pendiente por verificación. Se envío un correo de confirmación a <span >{user?.email}</span>
                    </p>
                </div>
            )
        }
    </>
    )
    }
    export default memo(VerificationEmail)
