import { memo, useEffect } from "react";
import { Outlet } from "react-router-dom"
import NavAdmin from "/src/components/admin/NavAdmin"
import SidebarAdmin from "/src/components/admin/SidebarAdmin"
import { useAuth } from "/src/hooks/useAuth";

import useAdmin from "/src/hooks/useAdmin";
import useStore from "/src/hooks/useStore";
import ModalRequest from "/src/components/admin/ModalRequest";
import ModalComponent from "/src/components/admin/ModalComponent";
import ModalImage from "/src/components/admin/ModalImage";
import ModalDelete from "/src/components/admin/ModalDelete";
import IsLoading from "/src/components/store/common/IsLoading";

const AdminLayout=()=> {

  const { user } = useAuth({
    middleware: 'admin',
    url: '/store'
  })

  const { handleCloseModals } = useAdmin()

  const { handleSetEnableAdminUser } = useStore()
  
  useEffect(()=>{
    user?.role == "admin" ? handleSetEnableAdminUser(true) : handleSetEnableAdminUser(false)
  },[user])

  if(user === undefined){
    return (<IsLoading/>)
  }
  return (
    <div className="flex cursor-default bg-gray-100 flex-col">
      <NavAdmin />
        
      <div className="flex h-[calc(100vh-50px)]" >
        <SidebarAdmin />
          
          <div className="flex  w-full flex-wrap p-1 overflow-y-hidden">
            <Outlet />
          </div>
      </div>

      {/* <ModalImageVisor/> */}
      <ModalComponent onClose={()=>handleCloseModals()} />
      <ModalImage onClose={()=>handleCloseModals()} />
      <ModalDelete onClose={()=>handleCloseModals()}/>
      <ModalRequest onClose={()=>handleCloseModals()}/>
    </div>
  )
}


export default memo(AdminLayout)