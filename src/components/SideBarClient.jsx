import { memo, useEffect, useState } from 'react'
import { sectionsUser } from '/src/data/sectionsUser'
import SectionUser from './SectionUser'
import useStore from '/src/hooks/useStore'



const SideBarClient=()=> {
    const {navHeight}= useStore()
    const [contentHeight, setContentHeight] = useState(0);


    const updateContentHeight = () => {
        setContentHeight(window.innerHeight - navHeight);
    };

    useEffect(() => {
    // Actualizar la altura del contenido cuando se carga el componente o cuando cambia navHeight
    updateContentHeight();

    // Agregar un event listener para el evento de resize
    window.addEventListener('resize', updateContentHeight);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', updateContentHeight);
    };
  }, [navHeight]);
    
    return (
        <div className='flex'>
            <div 
                style={{ height: `${contentHeight}px` }}
                className='hidden md:flex fixed items-center'
            >
                <div className=''>
                    <ul className='flex flex-col w-10 lg:w-[70px] bg-white border rounded-r-md'>
                        {sectionsUser.map((section)=>{
                        return(
                            <SectionUser 
                                key={section.id}
                                section={section}
                            />
                            )
                        })}
                        
                    </ul>
                </div>
            </div>
            <div className='hidden md:flex w-10 lg:w-[70px] h-full'></div>
        </div>
    )
}
export default memo(SideBarClient)
