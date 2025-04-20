import { Link, useNavigate } from "react-router-dom"
import useStore from "../../hooks/useStore";
import useAdmin from "../../hooks/useAdmin";
import IsLoading from "../../components/store/common/IsLoading";
import add from '/src/static/icons/add.svg'

import ImageTable from "../../components/admin/ImageTable";
import { memo } from "react";
import BlockHeader from "/src/components/admin/BlockHeader";
import BlockCategory from "/src/components/admin/BlockCategory";

const IndexCategory=()=> {
    const navigate = useNavigate()
    
    const {categories} = useStore()
    const {setCategoryAdmin} = useAdmin()
    const selectEditCategory= (cat) =>{
        setCategoryAdmin(cat)
        navigate(`/admin/categories/item/edit/${cat.id}`)
    }

    if(categories === undefined) return(<IsLoading/>)
    
    return (
    <div className="overflow-y-hidden flex flex-col flex-1 pl-2 pb-2">
        <BlockHeader
            name='Categorías'
        >
            <Link
                className=' flex justify-center items-center cursor-pointer text-white hover:scale-110 transition-all'
                to={'/admin/categories/category'}
            >
                <img src={add} alt="save" className='w-8 h-8 invert' />
            </Link>
        </BlockHeader>

        <div className="flex flex-1 relative w-full overflow-hidden pb-5 overflow-y-scroll">
            <div className='w-full absolute '>
                <div className='flex gap-2 flex-wrap pr-1'>
                {categories?.map(category => (
                    <BlockCategory
                        category={category}
                        key={category.id}
                    />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default memo(IndexCategory)



// <div key={category.id} className='flex justify-between group border bg-white hover:border-slate-400 hover:border-l-slate-700 border-l-4 mt-0.5 py-0.5'>
//     <div 
//         className='flex justify-start   flex-1 items-center cursor-pointer'
        
//     >
//         <div className='w-14 text-gray-400 px-4 group-hover:font-bold group-hover:text-slate-700 transition-all'>
//             #{category.id}
//         </div>
//         <div className='flex flex-col py-2 w-full max-w-[250px]'>
//             <span 
//                 className="group-hover:font-bold group-hover:text-slate-700 text-slate-600 transition-all "
//             >
//                 {category.name}
//             </span>
//             <span className=" font-thin text-slate-500 group-hover:font-bold group-hover:text-slate-700">Grupo: {category.group_name}</span>
//         </div>
//         <div className="px-10 border-transparent group-hover:border-slate-400 overflow-hidden">
//             <ImageTable 
//                 images={category.images}
//                 url={import.meta.env.VITE_API_URL + "/categories/"}
//             />
//         </div>
//     </div>
    
//     <div 
//         className="flex justify-center items-center"

//     >
//         <div 
//             onClick={()=>selectEditCategory(category)}
//             className='flex justify-center items-center transition-all px-2 font-bold text-sm cursor-pointer'
//         >
//             <img src={edit} alt="save" className='w-7 h-7 grey' />
//         </div>
//     </div>

// </div>