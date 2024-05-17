import moment from 'moment/dist/moment';
import 'moment/dist/locale/es'
import localization from 'moment/locale/es';
moment.suppressDeprecationWarnings = true;
moment.updateLocale('es', localization);
import { memo } from 'react';

import ok from '/src/static/icons/ok.svg'
import plane from '/src/static/icons/plane.svg'
import store from '/src/static/icons/store.svg'
import { timeToText } from '/src/helpers';


const TagTracking =({orderTracking, showTime=false})=> {
    
  return (
    
    <>
        
        <div className="flex justify-center items-center font-bold h-12 transition-all text-sm">
            {
                orderTracking !== null && orderTracking?.state === "ENTREGADO"?
                <div className='flex flex-col justify-center items-center gap-x-2 w-32 transition-all text-green-500'>
                    <div className="flex gap-x-2 justify-center items-center">
                        <img src={ok}  className="gray  w-4 h-4 green" alt="" />
                        Entregado
                    </div>
                    {showTime && (<span className="text-[12px] font-normal">{timeToText(orderTracking.updated_at,'ll')}</span>)}
                </div>
                :orderTracking !== null && orderTracking?.state === "EN TRAYECTO"?
                <div className='flex flex-col justify-center items-center gap-x-2 w-32 transition-all text-orange-500'>
                    <div className="flex gap-x-2 justify-center items-center">
                        <img src={plane}  className="gray  w-4 h-4 orange" alt="" />
                        Trayecto
                    </div>
                    {showTime && (<span className="text-[12px] font-normal">{timeToText(orderTracking.updated_at,"ll")}</span>)}
                </div>
                :orderTracking !== null && orderTracking?.state === "EN BODEGA"?
                <div className='flex justify-center items-center gap-x-2   w-32 transition-all h-11 text-sky-500'>
                    <img src={store}  className="gray w-4 h-4 blue" alt="" />
                    Bodega
                </div>
                :
                'Status error'
            }
            
        </div>

    </>
    
  )
}

export default memo(TagTracking)



