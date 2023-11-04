import { useEffect } from "react";
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import { useAuth } from "/src/hooks/useAuth";

import Modal from 'react-modal'

import "react-toastify/dist/ReactToastify.css"
import IsLoading from "/src/components/IsLoading";

import useAdmin from "/src/hooks/useAdmin";
import useStore from "/src/hooks/useStore";

import ModalComponent from "/src/components/admin/ModalComponent";
import ModalRequest from "/src/components/admin/ModalRequest";
import NavSellerAdmin from "/src/components/seller/NavSellerAdmin";
import SidebarSellerAdmin from "/src/components/sellerAdmin/SidebarSellerAdmin";
import ModalImage from "/src/components/admin/ModalImage";
import ModalDelete from "/src/components/admin/ModalDelete";


Modal.setAppElement('#root')

export default function SellerAdminLayout(){

  const { user } = useAuth({
    middleware: 'admin',
    url: '/store'
  })

  const {handleCloseModals} = useAdmin()

  const {handleSetEnableAdminUser} = useStore()
  
    useEffect(()=>{
    if(user?.role == "admin"){
      handleSetEnableAdminUser(true)
    }else{
      handleSetEnableAdminUser(false)
    }
  },[user])


  if(user === undefined){
    return ( <IsLoading/> )
  }

  return (
    <div className="flex cursor-default bg-gray-100 flex-col">
      <NavSellerAdmin />
        
      <div className="flex h-[calc(100vh-50px)]" > 
        <SidebarSellerAdmin />
          
          <div className="flex  w-full flex-wrap p-2 overflow-y-hidden">
            <Outlet />
          </div>
          <ToastContainer />
      </div>

      
      <ModalComponent onClose={handleCloseModals} />
      <ModalImage onClose={handleCloseModals} />
      <ModalDelete onClose={handleCloseModals}/>
      <ModalRequest onClose={handleCloseModals} />
    </div>

  )
}