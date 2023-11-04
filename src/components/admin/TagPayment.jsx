import { memo } from 'react';
import ok from '/src/static/icons/ok.svg'
import time from '/src/static/icons/time.svg'
import { ORDER_PAYMENT_TYPES } from '/src/data/orderPaymentTypes'
import { timeToText } from '/src/helpers';


const TagPayment=({orderPayment, mini=false, showTime=false})=> {

  return (
    
    <>
        
        {
          mini?
          <div className="flex justify-end items-center transition-all text-xs ">
            {
                orderPayment !== null && orderPayment?.state === ORDER_PAYMENT_TYPES['PAGADO'].VALUE?
                <div className='flex justify-end items-center text-green-500'>
                      <img src={ok}  className="green w-4 h-4" alt="" />
                      {orderPayment?.state}
                </div>
                :orderPayment !== null && orderPayment?.state === ORDER_PAYMENT_TYPES['POR PAGAR'].VALUE?
                <div className='flex justify-end items-center text-red-500'>
                      <img src={time}  className="red w-4 h-4" alt="" />
                      {orderPayment.state}
                </div>
                :
                'Status error'
            }
            
          </div>
          :
          <div className="flex justify-center items-center font-bold h-12 transition-all text-sm ">
            {
                orderPayment !== null && orderPayment?.state === ORDER_PAYMENT_TYPES['PAGADO'].VALUE?
                <div className='flex flex-col justify-center items-center  w-32 transition-all text-green-500'>
                    <div className="flex gap-x-1 justify-center items-center ">
                      <img src={ok}  className="gray w-4 h-4 green" alt="" />
                      Pagado
                    </div>
                    {showTime && (
                      <div className='flex flex-col justify-center items-center'>
                        <span className="text-[12px] font-normal">{timeToText(orderPayment.updated_at, 'll')}</span>
                    </div>
                    )}
                </div>
                :orderPayment !== null && orderPayment?.state === ORDER_PAYMENT_TYPES['POR PAGAR'].VALUE?
                <div className='flex flex-col justify-center items-center  text-red-500 w-32 transition-all'>
                    <div className="flex gap-x-1 justify-center items-center " >
                      <img src={time}  className="gray w-4 h-4 red" alt="" />
                      Por pagar
                    </div>
                    {showTime && (
                      <div className='flex flex-col justify-center items-center'>
                        <span className="text-[12px] font-normal">{timeToText(orderPayment.updated_at, 'll')}</span>
                    </div>
                    )}
                </div>
                :
                'Status error'
            }
            
          </div>

        }

    </>
    
  )
}

export default memo(TagPayment)