import { memo, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import useStore from "/src/hooks/useStore"
import { useAuth } from "/src/hooks/useAuth"
import Group from "./Group"
import logo from "/src/static/img/logoWhite.svg"



import ShowCategories from "./ShowCategories"
import VerificationEmail from "./VerificationEmail"
import BadgeCart from "./BadgeCart"
import close from '/src/static/icons/close.svg'
import search from '/src/static/icons/search.svg'
import iconUser from '/src/static/icons/userBlack.svg'
import menu from '/src/static/icons/menu.svg'
import Category from "./Category"
import ButtomViews from "./common/ButtomViews"
import NavUserSections from "./NavUserSections"
import { urlsBackend } from "/src/data/urlsBackend"
import useAdmin from "/src/hooks/useAdmin"
import ModalViewSearch from "./customer/ModalViewSearch"



const  Navbar=()=> {
    const navigate = useNavigate()
    

    const { 
        groups,
        showMenu,
        handleSetMenu,
        categories,
        groupToShow,
        handleGroupToShow,
        handleSetNavHeight
        
    } = useStore()

    const {modalStateImage, modalStateComponent} = useAdmin()
    const  cats = categories?.filter( category => category?.group_id === groupToShow?.id)
    const zindex = modalStateImage || modalStateComponent ? "z-0" : "z-30"

    const {
        handleModalStateComponent,
        handleModalViewComponent,
        handleCloseModals
    } = useAdmin()
    
    const {
        user 
    } = useAuth({
        middleware: 'guest',
    })

    const handleShowMenu = () =>{
        handleSetMenu(!showMenu)
    }
    
    const handleCloseMenu= () =>{
        handleSetMenu(false)
    }


    const [navHeight, setNavHeight] = useState(0);

    const navRef = useRef(null);
    
    useEffect(() => {
        // Verificamos que el navegador soporte ResizeObserver
        if (typeof ResizeObserver !== "undefined" && navRef.current) {
            // Creamos el observer
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    // Actualizamos el estado con la nueva altura
                    setNavHeight(entry.target.offsetHeight)
                    handleSetNavHeight(entry.target.offsetHeight)
                }
            });

            // Empezamos a observar el elemento
            resizeObserver.observe(navRef.current);

            // Nos aseguramos de desconectar el observer cuando el componente se desmonte
            return () => {
                resizeObserver.disconnect();
            };
        }
    }, []);

    //Efecto timer en navbar
    const timerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseEnter = (group_id) => {
        // Al entrar al elemento de la lista, muestra el div
        handleGroupToShow(group_id)

        // Si hay un temporizador activo, lo cancelamos
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setIsVisible(true);
    };
    const handleMouseLeave = () => {
        // Al salir del elemento de la lista, iniciamos un temporizador
        timerRef.current = setTimeout(() => {
            // handleGroupToShow(null);
            setIsVisible(false);
        }, 500);
    };
    const handleDivMouseEnter = () => {
        // Al entrar al div, cancelamos el temporizador
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    };

    //FIN Efecto timer en navbar

  return (
    <div className="relative font-poppins-regular"> 
         
            {/* menu vista tablet y telefonos */}
            <div 
                className={`${!showMenu?'hidden':'fixed'} flex flex-col  items-center z-10 bg-white h-screen w-full `}
            >
                <div className="h-[55px]"></div>
                <div className="border w-full border-red-500 p-2">
                    <div 
                        className="border border-slate-800 flex gap-x-2 items-center   rounded-lg p-2"
                    >
                        <img className="w-6 h-6 grey" src={search} alt="" />
                        <div
                            className="flex justify-start items-center text-slate-600 w-full "
                            onClick={()=> {
                                handleModalStateComponent(true)
                                handleModalViewComponent(<ModalViewSearch closeModal={handleCloseModals}/>)
                                handleCloseMenu(false)
                                navigate('/store')
                            }}
                        >
                            Buscar...
                        </div>
                            
                    </div>
                </div>
                <ShowCategories
                    width={200}
                    height={200}
                    font="text-xl"
                />
            </div>
            
            <nav 
                className={`center-c fixed w-full ${zindex}`}
            >

                <div ref={navRef} className="w-full center-c  bg-white/80 backdrop-blur-sm ">
    
                    <div className='relative flex flex-col lg:flex-row justify-between items-center w-full gap-x-4 px-20 '>
                        <div 
                            onClick={()=> handleShowMenu()}
                            className="center-c absolute md:hidden left-0 h-full px-1"
                        >
                            <img className="w-6 h-6 white" src={showMenu?close:menu} alt="" />
                        </div>
                        {/* cart and search movil device */}
                        <div 
                            
                            className="flex gap-x-3 absolute md:hidden right-5 h-full  justify-center items-center text-slate-700"
                        >
                            
                            {
                                !user && (
                                    <div
                                        className=" cursor-pointer"
                                        onClick={()=> navigate('/auth/login/')}
                                    >
                                        <img className="w-6 h-6 white" src={iconUser} alt="" />
                                    </div>
                                )
                            }
                            <div 
                                className="relative"
                                onClick={()=>{
                                    handleCloseMenu()
                                    navigate('/store/cart')
                                }}
                            >
                                <BadgeCart/>
                            </div>
                        </div>


                        {/* Logo */}
                        <LogoStore 
                            action={()=>{
                            handleCloseMenu() 
                            navigate('/store')}} 
                            logo={logo}
                        />

                        
                        {/* Grupos */}
                    <ul className=" relative hidden md:flex w-full gap-x-1 text-sm justify-center items-center z-10  flex-1">    
                        {groups?.map( group => group.show === true && (
                            <div 
                                key={group.id}
                                onMouseEnter={()=>handleMouseEnter(group.id)} onMouseLeave={handleMouseLeave}
                            >
                                <Group group={group}/>
                            </div>
                        ))}

                        <Types/>
                    </ul>
                        {/* Botones usuario y carrito */}
                        <div className="hidden md:flex items-center gap-x-4">
                            
                            <div className="z-10 relative lg:relative flex justify-center items-center text-slate-600 ">
                                
                                
                                <div
                                    className="px-2"
                                    onClick={()=> {
                                        handleModalStateComponent(true)
                                        handleModalViewComponent(<ModalViewSearch closeModal={handleCloseModals}/>)
                                        
                                    }}
                                >
                                    <img className="w-5 h-5 grey" src={search} alt="" />

                                </div>
                                <Link
                                    className="relative px-2"
                                    to={"/store/cart"}
                                >
                                    <BadgeCart/>
                                </Link>
                                {/* Desplegable de usuario */}
                                <NavUserSections/>

                                <ButtomViews/>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
                <VerificationEmail/>

                <div className={` w-full  flex-wrap bg-white center-r 
                 transition-all duration-300 ease-in-out 
                 ${isVisible ? 'opacity-100 ' : 'opacity-100 h-0 overflow-hidden'}`}>
                  
                    
                    
                    <div 
                        onMouseEnter={handleDivMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className={`rounded-b-sm w-full shadow-lg flex-wrap bg-opacity-90 center-r 
                        transition-all duration-300 ease-in-out 
                            ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    >
                    
                    
                        <div  
                            className={`flex justify-center p-4 space-x-2 flex-wrap`}
                            onClick={()=>{
                                setIsVisible(false)
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                })
                            }}
                        >
                            {cats?.map(category => category.show && (
                                <Category 
                                    width={150}
                                    height={150}
                                    key={category?.id}
                                    categoria={category}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                
            </nav>
            
            <div style={{ height: `${navHeight}px` }}></div>
            <div
                className=" opacity-0"
            >
                
            </div>
        </div>

  )
}

const LogoStore = ({action, logo})=>{

    return(
        <div 
            className="center-c shrink-0 cursor-pointer py-1"
            onClick={()=>{
                action()
            }}
        >
            <img 
                className="w-28 md:h-30 "
                src={logo}
                alt="imh" 
            />
        </div>
    )
}


const Types = ()=>{

    const { types } = useStore()
    const navigate = useNavigate()

    return(
        <div
            className="relative flex-col group px-4"
        >
            <span className=" cursor-pointer ">Más</span>
            <div 
                className="hidden group-hover:flex flex-col rounded-lg shadow-md absolute left-0  top-full bg-white p-1"
            >
                {types?.map(typ => typ.show === true && (
                    <li 
                        key={typ.id}
                        className="  gap-x-2 flex justify-start  group/li items-center transition-all text-sm gap-y-1 cursor-pointer hover:text-white  rounded-lg w-52 bg-white py-2 px-4 hover:bg-teal-600"
                        onClick={()=>{
                            navigate(`/store/products/?typ=${typ.name}`)
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            })
                        }}
                    >
                        <img src={urlsBackend.ICON + typ.image} className="h-5 w-5 " alt="icon" />
                        {typ.name}
                    </li>
                ))}
            </div>
        </div>
    )
}
export default memo(Navbar)
