import { memo } from "react";
import { Outlet } from "react-router-dom"
import IsLoading from "../components/store/common/IsLoading";
import CartDrawer from "/src/components/CartDrawer";
import { GroupService } from "/src/services/GroupService";
import StoreNavbar from "../components/store/navbar/StoreNavbar";

const StoreLayout = () => {
  const { data } = GroupService.useAllGroups();

  if (!data) {
    return <IsLoading />
  }

  return (
    <div className="relative cursor-default min-h-screen ">
      <StoreNavbar/>

      {/*  Aquí le das margen superior equivalente a la altura del navbar */}
      <div className="flex flex-col  transition-all">
        <Outlet />
      </div>

      <CartDrawer />
    </div>
  )
}

export default memo(StoreLayout)
