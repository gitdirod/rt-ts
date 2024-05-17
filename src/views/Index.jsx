import Landing from "../components/Landing";
import ShowCategories from "../components/ShowCategories";
import { memo } from "react";
import SuggestedsProducts from "../components/SuggestedsProducts";
import Footer from "../components/customer/Footer";
import Memories from "../components/Memories";
import BottomBarClient from "../components/BottomBarClient";

import { useAuth } from "../hooks/useAuth";
import SuggestedCategory from "/src/components/SuggestedCategory";

const Inicio=()=> {

  const { user } = useAuth({middleware: 'guest'})
  
  return (
    <div className="flex flex-col mt-2 transition-all">
      <BottomBarClient/>
      <Landing/>
      <div className="flex gap-x-4">
        <SuggestedCategory/>
      </div>
      <SuggestedsProducts/>
      <ShowCategories
        font="text-lg"
      />
  
      <Memories/>
      <Footer/> 
    </div>
    
  )
}

export default memo(Inicio)
