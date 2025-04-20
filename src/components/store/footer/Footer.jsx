import {memo} from 'react'
import Point from './Point';
import mail from '/src/static/icons/email.svg'
import iconStore from '/src/static/icons/store.svg'
import iconComment from '/src/static/icons/commentBlack.svg'
import iconWhatsapp from '/src/static/icons/whatsappFilled.svg'
import iconFacebook from '/src/static/icons/facebookFilled.svg'

const Footer=()=> {
  return (
    <div className="w-full md:pt-20 font-poppins-bold ">
        <div 
          id="contact"
          className="flex flex-col gap-4 text-white items-left uppercase text-4xl w-full px-2 md:px-10 py-10 bg-cover bg-center "
        >
          <div className="flex flex-col gap-y-4 md:flex-row gap-x-4">
            {/* points*/}
            <div className="border bg-slate-0  backdrop-blur-sm bg-opacity-70 p-4 rounded-lg w-full flex-1 shadow-lg">
              <div className="flex  justify-center items-center gap-x-4">
                <img src={iconStore}  className='w-10 h-10 white' alt="iconStore" />

                <span>Estamos ubicados</span>
              </div>
              <div>
                
                <Point/>
              </div>
            </div>

            {/* Contact block */}
            <div className="flex relative justify-center items-center border backdrop-blur-sm  shadow-lg bg-cyanPrimary p-4 bg-opacity-60 rounded-lg flex-1 overflow-hidden ">
              
              <div className=' absolute opacity-10 left-0'>
                <img src={iconComment}  className='w-64 h-64 white' alt="iconStore" />
              </div>
              
              <div>
              <div className="flex items-center justify-center gap-x-4">
              <img src={iconComment}  className='w-10 h-10 white' alt="iconStore" />
                <span>Contacto:</span>
              </div>
              <div className="flex items-center justify-center gap-x-2 pt-4 text-xl">
                <img src={iconWhatsapp} className="w-6 h-6 white" alt="" />
                098 532 7622 - 099 861 3905
              </div>

              <div className="flex items-center justify-center gap-x-2 pt-4 text-xl lowercase">
                <img className="w-6 h-6 invert" src={mail} alt="" />
                info@tecnitools.ec - ventas@tecnitools.ec
              </div>
              </div>
              
            </div>
          </div>
          <div
            className='flex gap-8 justify-center items-center border  backdrop-blur-sm shadow-lg bg-opacity-70  bg-slate-800 p-4 rounded-lg w-full flex-1'
          >
            {/* Facebook */}
            <div className='drop-shadow-md cursor-pointer hover:scale-110 transition-all'>
              <a href="https://www.facebook.com/profile.php?id=100063703892588" target="_blank">
                <img src={iconFacebook} className="w-10 h-10 white" alt="" />
              </a>
            </div>
            {/* Instagram */}
            
            {/* <div>
            <a href="https://www.instagram.com/lienzomaniaec/" target='_blank'>
            <svg 
              className='fill-white w-10 h-10 drop-shadow-md cursor-pointer hover:scale-110 transition-all'
              id="Layer_1" 
              height="512" 
              viewBox="0 0 512 512" 
              width="512" 
              xmlns="http://www.w3.org/2000/svg" 
              data-name="Layer 1"><circle cx="256" cy="256" r="52.5"/><path d="m256 6c-138.071 0-250 111.929-250 250s111.929 250 250 250 250-111.929 250-250-111.929-250-250-250zm154.458 313.54c-1.2 23.768-7.879 47.206-25.2 64.343-17.489 17.3-41.038 23.746-65.035 24.934h-128.445c-24-1.188-47.546-7.63-65.035-24.934-17.322-17.137-24-40.575-25.2-64.343v-127.08c1.2-23.768 7.879-47.206 25.2-64.344 17.489-17.3 41.038-23.746 65.035-24.933h128.444c24 1.187 47.546 7.63 65.035 24.933 17.322 17.138 24 40.576 25.2 64.344z"/><path d="m318.6 132.138c-31.286-.858-93.906-.858-125.192 0-16.281.447-34.738 4.5-46.338 16.89-12.054 12.879-16.609 28.439-17.071 45.846-.812 30.552 0 122.252 0 122.252.529 17.405 5.017 32.967 17.071 45.846 11.6 12.394 30.057 16.443 46.338 16.89 31.286.858 93.906.858 125.192 0 16.281-.447 34.738-4.5 46.338-16.89 12.054-12.879 16.609-28.439 17.071-45.846v-122.252c-.462-17.407-5.017-32.967-17.071-45.846-11.604-12.394-30.061-16.443-46.338-16.89zm-62.6 205.237a81.375 81.375 0 1 1 81.375-81.375 81.375 81.375 0 0 1 -81.375 81.375zm81.721-145.953a16.275 16.275 0 1 1 16.279-16.275 16.275 16.275 0 0 1 -16.279 16.275z"/>
            </svg>
            </a>
            </div> */}
            {/* Whatsapp */}
            <div className='drop-shadow-md cursor-pointer hover:scale-110 transition-all'>
              <a 
                href='https://api.whatsapp.com/send?phone=+593985327622&text=Hola!%C2%A0me%C2%A0puedes%C2%A0ayudar%C2%A0con%C2%A0un%C2%A0equipo,%C2%A0Gracias.' target="_blank"
              >
                <img src={iconWhatsapp} className="w-10 h-10 white" alt="" />
              </a>
            </div>
            {/* Ticktock */}
            {/* <div>
              <svg 
              className='fill-white w-10 h-10  drop-shadow-md cursor-pointer hover:scale-110 transition-all'
              height="512" 
              viewBox="0 0 152 152" 
              width="512" 
              xmlns="http://www.w3.org/2000/svg">
                <g id="Layer_2" data-name="Layer 2"><g id="Color"><path id="_77.TikTok" d="m76 0a76 76 0 1 0 76 76 76 76 0 0 0 -76-76zm34.26 67.53c-6.78.75-12.59-1.93-18.4-5.35 0 .56.17 17.92-.12 26.2-.29 8.51-3.33 16-10 21.59-14.14 11.87-34.21 5.46-39-12.69-2.6-9.89-.34-18.8 7.42-25.85 4.37-4 9.76-5.78 15.54-6.52 1.24-.16 2.49-.23 3.83-.35v13.44c-1.7.42-3.42.79-5.11 1.29a23 23 0 0 0 -3.42 1.29 11 11 0 0 0 -4 17 12 12 0 0 0 11.47 4.84c4.37-.53 7.11-3.28 8.73-7.23a25 25 0 0 0 1.43-9.76c-.06-16.32-.06-32.63-.09-48.95a4.5 4.5 0 0 1 .07-.5h13.05c1.46 10.92 7 17.84 18.6 18.82z" data-name="77.TikTok"/></g></g></svg>
            </div> */}
          </div>
        </div>
        
      </div>
  )
}

export default memo(Footer) 