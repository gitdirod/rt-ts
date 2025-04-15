import { memo, useEffect } from "react";
import { Outlet } from "react-router-dom"
import useStore from "../hooks/useStore";
import { useAuth } from "../hooks/useAuth";
import useAdmin from "/src/hooks/useAdmin";
import Navbar from "../components/Navbar"
import IsLoading from "../components/IsLoading";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import Modal from 'react-modal'
import ModalImage from "/src/components/admin/ModalImage";
import ModalComponent from "/src/components/admin/ModalComponent";
import WhatsAppContactButton from "/src/components/customer/WhatsAppContactButton";
import ModalRequest from "/src/components/admin/ModalRequest";


Modal.setAppElement('#root')

const StoreLayout=()=> {

  const {user} = useAuth({middleware: 'guest'})
  const { 
    isProducts,
    isGroups,
    isCategories,
    handleSetEnableUser,
  } = useStore()

  const {handleCloseModals} = useAdmin()

  useEffect(()=>{
    if(user == undefined){
    }else{
      handleSetEnableUser(true)
    }
  },[user])

  if(isProducts || isCategories|| isGroups){
    return <IsLoading/>
  }
  
  return (
    <div
      className="relative cursor-default min-h-screen"
    >
      <div className="relative flex flex-col min-h-screen bg-zinc-50">
        <Navbar />
        <div className="flex flex-col transition-all">
          <Outlet/>
        </div>
      </div>
      <WhatsAppContactButton/>
      <ModalComponent onClose={handleCloseModals} />
      <ModalImage onClose={handleCloseModals} />
      <ModalRequest onClose={handleCloseModals}/>
      <ToastContainer />
    </div>
  )
}
export default memo(StoreLayout)