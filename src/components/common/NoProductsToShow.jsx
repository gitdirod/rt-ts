import React from 'react'
import { Link } from 'react-router-dom'

export default function NoProductsToShow({icon, goTo}) {
  return (
    <Link 
      to={goTo}
      className="  font-poppins-bold p-8 center-c gap-y-4 text-slate-700 text-md border shadow rounded-lg bg-white "
    >
        <img className="w-40" src={icon} alt="img-cuentions" />
        <div className="center-c">
            <p className="text-4xl md:px-10">Aún no tienes productos para mostrar</p>
            <span className="font-normal text-xl">Vuelve cuando hayas cargado un artículo al carrito.</span>
        </div>
    </Link>
  )
}
