import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import { memo } from "react"
import logo from "/src/static/img/logo.svg"

const AuthLayout=()=> {


  return (
    <>
      <main className="flex justify-center items-center min-h-screen min-w-full">
          <div className="flex flex-col md:flex-row justify-center items-center w-full">
              
                <Link
                to='/' 
                  className="w-full max-w-md flex justify-center items-center"
                >
                  <img className="w-52 md:w-full max-w-sm p-4 mx-4"
                      src={logo} 
                      alt="Logo empresa"
                  />
                </Link>
              
              <div className="p-4 mx-4 ">
                  <Outlet />
              </div>
          </div>
          
      </main>
    </>
    
  )
}
export default memo(AuthLayout) 
