import { createRef, useState, memo} from 'react'
import { Link } from "react-router-dom"
import Alert from '../../components/Alert'
import { useAuth } from '../../hooks/useAuth'

const Register=()=> {

    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const password_confirmationRef = createRef()

    const [errores, setErrores] = useState([])
    const { register } = useAuth({
        middleware: 'guest',
         url: '/'
        })
    

    const handleSubmit = async e => {
        e.preventDefault()
        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password : passwordRef.current.value,
            password_confirmation : password_confirmationRef.current.value
        }
        
        register(datos, setErrores)
    }

// #F1A31F amarillo
// #E35544 rojo
// #15A7AE cyan claro
// #2D565E cyan oscuro

  return (
    <>
        <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-slate-700">Crea tu cuenta</h1>
            <p className=" text-slate-700"> Crea tu cuenta llenando el formulario</p>
        </div>
        <div className="bg-white shadow-md rounded-sm mt-10 px-5 py-10 font">
            <form
                onSubmit={handleSubmit}
                noValidate
            >
                {/* { errores ? errores.map((error, i) => <Alert key={i}>{error}</Alert> ) : null } */}
                <div className="mb-4">
                    <label
                        className="text-slate-700 font-bold"
                        htmlFor="name"
                    >Nombre:
                    </label>
                    <input 
                        type="text" 
                        id="name"
                        className={`${errores.name ? "border-red-300" : "border-slate-300" } mt-2 w-full p-3 bg-gray-50 rounded-sm border outline-none focus:border-cyanPrimary focus:shadow-cyan-100 focus:shadow-sm`}
                        name="name"
                        placeholder="Escribe tu nombre"
                        ref={nameRef}
                    />
                    {errores.name ? <Alert>{errores.name}</Alert> : null}
                </div>

                <div className="mb-4">
                    <label
                        className="text-slate-700 font-bold"
                        htmlFor="email"
                    >Email:
                    </label>
                    <input 
                        type="email" 
                        id="email"
                        className={`${errores.email ? "border-red-300" : "border-slate-300" } mt-2 w-full p-3 bg-gray-50 rounded-sm border outline-none focus:border-cyanPrimary focus:shadow-cyan-100 focus:shadow-sm`}
                        name="email"
                        placeholder="Escribe tu Email"
                        ref={emailRef}
                    />
                    {errores.email ? <Alert>{errores.email}</Alert> : null}
                </div>

                <div className="mb-4">
                    <label
                        className="text-slate-700 font-bold"
                        htmlFor="password"
                    >Contraseña:
                    </label>
                    <input 
                        type="password" 
                        id="password"
                        className={`${errores.password ? "border-red-300" : "border-slate-300" } mt-2 w-full p-3 bg-gray-50 rounded-sm border outline-none focus:border-cyanPrimary focus:shadow-cyan-100 focus:shadow-sm`}
                        name="password"
                        placeholder="Escribe tu contraseña"
                        ref={passwordRef}
                    />
                    
                </div>

                <div className="mb-4">
                    <label
                        className="text-slate-700 font-bold"
                        htmlFor="password_confirmation"
                    >Repetir Contraseña:
                    </label>
                    <input 
                        type="password" 
                        id="password_confirmation"
                        className={`${errores.password ? "border-red-300" : "border-slate-300" } mt-2 w-full p-3 bg-gray-50 rounded-sm border outline-none focus:border-cyanPrimary focus:shadow-cyan-100 focus:shadow-sm`}
                        name="password_confirmation"
                        placeholder="Repite tu contraseña"
                        ref={password_confirmationRef}
                    />
                    
                    {errores.password ? <Alert>{errores.password}</Alert> : null}
                </div>
                <input 
                    type="submit"
                    value="Crear Cuenta"
                    className=" font-bold text-white border rounded-sm w-full uppercase p-3 bg-cyanPrimary cursor-pointer hover:bg-cyanDark transition-all duration-200 "
                />

            </form>
            <nav className="mt-4 text-center w-full">
                <Link 
                    className="text-slate-500 font-bold hover:text-slate-700 transition-all duration-200 border px-4 py-2 rounded-sm block w-full hover:shadow-sm"
                    to="/auth/login">
                    ¿Ya tienes una cuenta? Inicia Sesión
                </Link>
            </nav>

        </div>
    </>
  )
}

export default memo(Register)