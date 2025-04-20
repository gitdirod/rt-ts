import ShowCategories from "../components/store/category/ShowCategories";
import { memo } from "react";
// import SuggestedsProducts from "../components/SuggestedsProducts";
import Footer from "../components/customer/Footer";
import Memories from "../components/Memories";
import Landing from "/src/components/store/landing/Landing";
// import SuggestedCategory from "/src/components/SuggestedCategoryDELETE";

const Inicio=()=> {
  
  return (
    <div className="flex flex-col mt-2 transition-all">
      <Landing/>
      {/* <div className="flex gap-x-4">
        <SuggestedCategory/>
      </div> */}
      {/* <SuggestedsProducts/> */}
      <ShowCategories
        width={200}
        height={200}
        font="text-lg"
      />
  
      <Memories/>
      <Footer/> 
    </div>
    
  )
}

export default memo(Inicio)
