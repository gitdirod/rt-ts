import Alert from '/src/components/Alert'

export default function Label({children, htmlfor, name='', image=null, error=''}) {
  return (
    <>
        <div 
          className="flex items-start w-full h-fit text-sm max-w-md group/label border  focus-within:text-green-500 focus-within:ring-green-500 focus-within:border-green-500 bg-white text-slate-600 focus-within:ring-1"
        >
            <label 
                htmlFor={htmlfor}
                className="flex justify-start  items-center py-1 gap-x-2 text-slate-700' font-bold px-2 border-r group-focus-within/label:bg-green-500 group-focus-within/label:text-white"
            >
                {
                  image?
                  <img className="w-5 h-5  group-focus-within/label:white grey" src={image} alt="" />
                  :
                  ''
                }
                {name}
            </label>
            <div className="flex flex-1 h-[28px]">
                {children}
            </div>
        </div>
        {error ? <Alert>{error}</Alert> : null}
    </>
  )
}
