import React, { forwardRef, useState } from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, Button, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Typography } from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import QrCodeIcon from '@mui/icons-material/QrCode';
import useStore from '/src/hooks/useStore';
import ImageUploader from '/src/components/ImageUploader';

const ModalStoreUpdateProduct = forwardRef(({ product }, ref) => {


    const {
        categories, 
        types,
        mutateProducts,
        sizes,
        numbers,
    } = useStore()

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4
    };

    const [productName, setProductName] = useState(product?.name || '')
    const [productCode, setProductCode] = useState(product?.code || '')
    const [categoryId, setCategoryId] = useState(product?.category?.id || {})
    const [typeId, setTypeId] = useState(product?.type_product?.id || {})
    const [visible, setVisible] = useState(product?.available ? true : false)
    const [productDescripcion, setProductDescripcion] = useState(product?.description || '')
    const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);

    return (
        <Box sx={style}>
            {/* Primera coluna */}
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Inventory2OutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
                    <TextField id="product-name" label="Nombre:" variant="standard" value={productName} onChange={(event)=>setProductName(event.target.value)} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <QrCodeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
                    <TextField id="product-code" label="Codigo:" variant="standard" value={productCode} onChange={(event)=>setProductCode(event.target.value.toUpperCase())}/>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                        <InputLabel>Categoria</InputLabel>
                        <Select
                            value={categoryId}
                            label="categoria"
                            onChange={(event)=>setCategoryId(event.target.value)}
                        >
                            <MenuItem value="">
                                <em>Seleccionar categoria</em>
                            </MenuItem>
                            {
                                categories?.map((category)=> (
                                    <MenuItem key={category.id} value={category.id} >
                                        {category?.name}
                                    </MenuItem>))
                            }
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                        <InputLabel>Tipo de producto</InputLabel>
                        <Select
                            value={typeId}
                            label="Tipo"
                            onChange={(event)=>setTypeId(event.target.value)}
                        >
                            <MenuItem value="">
                                <em>Seleccionar</em>
                            </MenuItem>
                            {
                                types?.map((type)=> (
                                    <MenuItem className="text-slate-600" key={type.id} value={type.id} >
                                        {type.name}
                                    </MenuItem>))
                            }
                        </Select>
                    </FormControl>
                </Box>


                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={visible}
                            onChange={(event) => setVisible(event.target.checked)}
                            color="primary"
                        />
                        }
                        label="Visible en tienda"
                        sx={{ fontWeight: 'medium' }}
                    />
                </Box>

            </Box>
            {/*segunda columna  */}
            <Box>
                <Box sx={{ mb: 2 }}>
                    <FormControl fullWidth>
                        <FormLabel sx={{ mb: 1 }}>Descripción</FormLabel>
                        <TextareaAutosize
                            minRows={3}
                            placeholder="Ingrese una descripción"
                            style={{
                                width: '100%',
                                padding: 8,
                                borderRadius: 4,
                                border: '1px solid #ccc',
                                fontFamily: 'inherit',
                                fontSize: '1rem',
                                resize: 'vertical',
                            }}
                            value={productDescripcion}
                            onChange={(event) => setProductDescripcion(event.target.value)}
                        />
                    </FormControl>
                </Box> 

                <ImageUploader onChange={setImagenesSeleccionadas} />
    
            </Box>       
        </Box>
  );
});

export default ModalStoreUpdateProduct;
