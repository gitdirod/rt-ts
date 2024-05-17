import { 
    memo, 
    useEffect, 
    useState 
} from "react"
import { useLocation } from "react-router-dom"
import useStore from "/src/hooks/useStore"
import { useAuth } from "/src/hooks/useAuth";
import BottomBarClient from "/src/components/BottomBarClient"
import TittleName from "/src/components/TittleName"
import Products from "/src/components/Products"
import Memories from "/src/components/Memories"
import SuggestedCategory from "/src/components/SuggestedCategory"
import ShowCategories from "/src/components/ShowCategories"
import SuggestedsProducts from "/src/components/SuggestedsProducts"
import Footer from "/src/components/customer/Footer"
import iconAlert from '/src/static/icons/alertBlack.svg'

const CustomerView=()=> {
    
    const { user } = useAuth({middleware: 'guest'})
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const groupName = queryParams.get('gro');
    const categoryName = queryParams.get('cat');
    const typeName = queryParams.get('typ');
    const searchName = queryParams.get('search');

    const { products } = useStore()

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
      let filtered = [...products];
  
      if (searchName) {
        filtered = filtered.filter(product =>  product.available == true && 
        ( product.name.toUpperCase().replace(/\s+/g, '').includes(searchName.toUpperCase().replace(/\s+/g, '')) || 
            product.code.toUpperCase().replace(/\s+/g, '').includes(searchName.toUpperCase().replace(/\s+/g, ''))
        ));
      }
      if (typeName) {
        filtered = filtered.filter(product => product.type_product?.name === typeName && product.available);
      }

      if (categoryName) {
        filtered = filtered.filter(product => product.category?.name === categoryName && product.available);
      }
  
      if (groupName) {
        filtered = filtered.filter(product => product.group?.name === groupName && product.available);
      }
  
      setFilteredProducts(filtered);
  
    }, [products, categoryName, groupName, typeName, searchName]);

    return (
        <div className="">
            {user && ( <BottomBarClient/>) }

            {
                filteredProducts?.length ?
                <div className="center-c gap-8 pt-8 w-full">
                    <TittleName>
                        {
                            searchName? `Buscando: ${searchName}`:
                            categoryName && groupName ? 
                            `${categoryName} en ${groupName}`:
                            categoryName? categoryName
                            : groupName ? groupName :
                            typeName? typeName
                            : 'Todos los Productos'
                        }
                    </TittleName>
                    <Products products={filteredProducts}/>
                </div>
                :
                <div className="center-r md:py-20 text-5xl font-poppins-bold py-4">
                    <div className="center-r gap-4 text-white w-fit p-4 bg-yellow-500 shadow-md border rounded-lg">
                        <img src={iconAlert} className="w-10 h-10 white" alt="" />El producto que buscas no existe.
                    </div>
                </div>
            }
            <SuggestedsProducts/>
            <SuggestedCategory/>
            <ShowCategories
                font="text-lg"
            />
            <Memories/>
            <Footer/>
        </div>
    )
}
export default memo(CustomerView)
