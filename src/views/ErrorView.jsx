import { useRouteError } from "react-router-dom";
import Footer from "../components/customer/Footer";
import Memories from "/src/components/Memories";
import SuggestedsProducts from "/src/components/SuggestedsProducts";
import errorImage from "/src/static/img/404.svg"
import ShowCategories from "/src/components/store/category/ShowCategories";
import StoreNavbar from "/src/components/store/navbar/StoreNavbar";

export default function ErrorView() {
    const error = useRouteError();
    
    return (
        <div 
          id="error-page"
          className="min-h-screen bg-slate-100"
        >
          <StoreNavbarNavbar/>
          <div
            className="flex justify-center items-center flex-1 "
          >
            <div className="flex flex-1 justify-center items-center text-center md:pt-10  font-bold py-4">
              <div className="flex flex-col md:flex-row justify-center items-center text-pinkPrimary w-fit p-4 bg-white shadow-md rounded-md">
                <div>
                  <img 
                      className="w-96"
                      src={errorImage} alt="img-cuentions" 
                  />
                </div>
                <div className="flex flex-col text-xl md:text-3xl lg:text-7xl">
                  <div >La página que buscas </div>
                  <div>no existe.</div>
                </div>
              </div>
            </div>
          </div>
          <SuggestedsProducts/>
          <ShowCategories
            font="text-lg"
          />
          
          <Memories/>
          <Footer/>
        </div>
      );
}
