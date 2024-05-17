import Alert from '/src/components/Alert'

export default function LabelSimpleWithoutLine
({children, htmlfor, name='', icon=null, error='', style=''}) {
  return (
    <div className='center-c w-full max-w-md '>
        <div 
          className={`center-r group/label  text-sm w-full bg-white border rounded-lg p-1 text-slate-600 ${style} transition-all  focus-within:text-green-500 focus-within:border-green-500`}
        >
            <label 
                htmlFor={htmlfor}
                className="center-r py-1 gap-x-2 text-slate-700' px-1"
            >
                {
                  icon?
                  <img className="w-4 h-4 group-focus-within/label:green grey" src={icon} alt="" />
                  :''
                }
                {name}
            </label>
            <div className="center-r font-base">
                {children}
            </div>
        </div>
        {error ? <Alert>{error}</Alert> : null}
    </div>
  )
}
