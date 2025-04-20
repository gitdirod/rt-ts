import { useLoaderData } from "react-router-dom"
import IsLoading from "../../components/store/common/IsLoading"
import useAdmin from "../../hooks/useAdmin"
import useStore from "../../hooks/useStore"
import HeaderTables from "../../components/admin/HeaderTables"
import TableSimple from "../../components/admin/TableSimple"
import CategoryDescription from "../../components/admin/CategoryDescription"

export async function loader({ params }){
    return params.itemId
}

export default function CategoriesShower() {
    const {handleGetCategory} = useAdmin()
    const {categories} = useStore()
    const categoryUrl = useLoaderData()
    const category =  categories?.find((category)=> category.id === Number(categoryUrl))

    if(category === undefined) return (
        <IsLoading 
            bg = "bg-white"
        />
    )
    return (
        <div className="flex flex-wrap flex-1">
            {/* items list */}
            <div className=" flex flex-col">
                {/* Titulo y nuevo */}
                <HeaderTables 
                    NameSection = "Categorías"
                />
                <TableSimple 
                    items = {categories}
                    item = {category}
                    actionFunction = {handleGetCategory}
                    actionUrl = {"/admin/categories/item/"}
                />
            </div>
            {/* Item description  */}
            <div className="relative flex-1 overflow-y-scroll scrollbar">
                <CategoryDescription 
                    category = {category}
                />
            </div>
        
        </div>
    )
}
