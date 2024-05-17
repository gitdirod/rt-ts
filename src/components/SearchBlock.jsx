import { 
    useState, 
    useEffect, 
    memo } from "react"
import IconSearch from "/src/components/admin/IconSearch"
import useStore from "/src/hooks/useStore"
import IconDelete from "./admin/IconDelete"


const SearchBlock=()=> {
    const optiones = [
        {
            id:1,
            option: 'Nombre',
            tag: 'name',
            value:true
        },
        {
            id:2,
            option: 'Código',
            tag: 'code',
            value:false
        },
        {
            id:3,
            option: 'Categoría',
            tag: 'category_name',
            value:false
        },
        {
            id:4,
            option: 'Grupo',
            tag: 'group_name',
            value:false
        },
    ]
    const {handleSetShowProducts, products} = useStore()
    const [inputText, setInputText] = useState('')
    const [opts, setOpts] = useState(optiones)
    
    useEffect(()=>{
        const filtered = products?.filter(pro => {
            for(let i=0; i< opts.length; i++){
                if(pro[opts[i].tag].toUpperCase().replace(/\s+/g, '').includes(inputText.toUpperCase().replace(/\s+/g, '')) && opts[i].value){
                    return true
                }
            }
        })
        handleSetShowProducts(filtered)
    },[products, inputText, opts])

    const handleOptions =(id)=>{
        const optinToChange = opts?.map(option=>{
            if(option.id === Number(id)){
                return {...option, value: !option.value}
            }else{
                return option
            }
        })
        setOpts(optinToChange)
    }


    return (
        <div className=" relative flex flex-col  ">
            <ul className=" flex text-sm font-semibold w-fit gap-x-1 text-slate-600 border-green-100 rounded-md border bg-white cursor-pointer">
                {
                    opts?.map(opt=>{
                        return (
                            <li 
                                key={opt.id}
                                className={ opt.value? "bg-green-500 px-3 rounded-md text-white":"bg-white px-3 rounded-md text-slate-600" }
                                onClick={()=>handleOptions(opt.id)}
                            >
                                {opt.option}
                            </li>
                            )
                    })
                }
            </ul>
          <div
            className="flex w-full bg-white font-bold p-1 border-slate-500 gap-x-2 items-center border rounded-md "
          >
            <IconSearch/>
            
            
            <input 
              id="input_search"
              className="w-full outline-none text-slate-600 cursor-text" 
              placeholder="Buscar..."
              type="text"
              onChange={(e)=>setInputText(e.target.value)}
            />
            <div
              onClick={()=>{
                document.getElementById("input_search").value = ""
                setInputText('')}}
              className="stroke-slate-500 hover:stroke-slate-700"
            >
              <IconDelete/>
            </div>
          </div>
          
            
          
        </div>
  )
}
export default memo(SearchBlock)
