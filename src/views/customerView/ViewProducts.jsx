import { memo, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { ProductService } from '/src/services/ProductService'
import Products from "/src/components/Products"
import { Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'

const CustomerView = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const groupId = queryParams.get('gi')
  const categoryIds = queryParams.get('ci')?.split(',') || []

  const [rowsPerPage] = useState(15)
  const [first, setFirst] = useState(0)
  const [sortField] = useState('id')
  const [sortOrder] = useState('desc')

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)

  const { data, totalRecords, loading } = ProductService.useProducts({
    page,
    perPage: rowsPerPage,
    name: '',
    code: '',
    categories: categoryIds,
    types: [],
    group_id: groupId,
    sortField,
    sortOrder
  })


  // Reset cuando cambian los filtros de búsqueda o ruta
  useEffect(() => {
    if(products != []){
        setProducts([])
        setPage(1)
    }
  }, [location.search])

    // Agregar productos (sin duplicados)
    useEffect(() => {
        if (!data || !Array.isArray(data)) return
    
        let actualizado = false
    
        setProducts(prev => {
        const nuevos = data.filter(item => !prev.some(p => p.id === item.id))
        if (nuevos.length > 0) {
            actualizado = true
            return [...prev, ...nuevos]
        }
        return prev
        })
    
        // Solo si se actualizó
        if (actualizado) {
        // nada extra por ahora
        }
    }, [data])
  

  const loadMore = () => {
    setPage(prev => prev + 1)
  }

  const noMoreProducts = products.length >= totalRecords
  return (
    <div className="">
      <Products products={products} />

      <div className="w-full flex justify-center mt-6">
            <Button
                color="primary"
                sx={{ fontWeight: 'bold' }}
                loadingPosition="start"
                startIcon={<AddIcon />}
                variant="outlined"
                disabled={loading || noMoreProducts}
                onClick={loadMore}
            >
            {loading
                ? 'Cargando...'
                : noMoreProducts
                ? 'No hay más productos'
                : 'Ver más productos'}
            </Button>
      </div>

    </div>
  )
}

export default memo(CustomerView)
