import {memo, useEffect, useState} from 'react'
import search from '/src/static/icons/search.svg'
import LabelSimple from './LabelSimple'

const SearchComponent=({inputSearch, setOutput, style='text-slate-600', placeholder, styleInput})=> {
    const [textSearch, setTextSearch] = useState('')

    const updateSearch=()=>{
        if(textSearch.replace(/\s+/g, '')===''){
            setOutput(inputSearch)
        }else{
            const filtered = inputSearch?.filter(pro => {
                if(pro?.name?.toUpperCase().replace(/\s+/g, '').includes(textSearch.toUpperCase().replace(/\s+/g, '')) || pro?.code?.toUpperCase().replace(/\s+/g, '').includes(textSearch.toUpperCase().replace(/\s+/g, ''))){
                    return true
                }
            })
            setOutput(filtered)
        }
    }

    useEffect(()=>{
        updateSearch()
    },[textSearch,inputSearch])

    return (
        <div
            className='flex-1'
        >
            <div className={`flex justify-start items-center ${style}`}>
                
                <LabelSimple
                    htmlfor="name"
                    // name="Inventario"
                    image={search}
                    style={styleInput}
                    // error={errores.name}
                >
                    <input 
                    type="text" 
                    id="name"
                    className="flex-1 font-semibold outline-none transition-all duration-200 mx-2"
                    placeholder={placeholder}
                    onChange={(e)=>setTextSearch(e.target.value)}
                    />
                </LabelSimple>
            </div>
        </div>
    )
}

export default memo(SearchComponent)
