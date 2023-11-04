import AlertAdmin from './AlertAdmin'


export default function LabelSimple({children, htmlfor, name='', image=null, error='', flex='flex ', style='focus-within:text-green-500 focus-within:ring-green-500 focus-within:border-green-500'}) {
  return (
    <div className='center-c w-full max-w-md '>
        <div 
          className={` ${flex} rounded-lg p-0.5 group/label text-sm w-full border bg-white text-slate-600 ${style}`}
        >
            <label 
                htmlFor={htmlfor}
                className="center-r py-1 font-poppins-regular gap-x-2 text-slate-700' px-2 "
            >
                {
                  image?
                  <img className="w-4 h-4  group-focus-within/label:green grey" src={image} alt="" />
                  :
                  ''
                }
                {name}
            </label>
            <div className="center-r flex-1 font-base normal-case font-poppins-bold">
                {children}
            </div>
        </div>
        {error ? <AlertAdmin>{error}</AlertAdmin> : null}
    </div>
  )
}
