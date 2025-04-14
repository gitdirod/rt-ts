import React, { forwardRef, useState } from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, Button, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Typography } from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import QrCodeIcon from '@mui/icons-material/QrCode';
import useStore from '/src/hooks/useStore';
import ImageUploader from '/src/components/ImageUploader';
import CropOutlinedIcon from '@mui/icons-material/CropOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';

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
        width: 1000,
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
    const [productSize, setProductSize] = useState(product?.size || '');
    const [productWeight, setProductWeight] = useState(product?.weight || '');
    const [productPower, setProductPower] = useState(product?.number_color	 || '');

    return (
    <Box sx={style}>
        <Box sx={{ display: 'flex', gap: 4 }}>
            {/* Columna izquierda */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                    <Inventory2OutlinedIcon sx={{ color: 'action.active', mr: 1 }} />
                    <TextField
                    label="Nombre"
                    variant="standard"
                    fullWidth
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                    <QrCodeIcon sx={{ color: 'action.active', mr: 1 }} />
                    <TextField
                    label="Código"
                    variant="standard"
                    fullWidth
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value.toUpperCase())}
                    />
                </Box>

                <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Categoría</InputLabel>
                    <Select
                    value={categoryId}
                    label="Categoría"
                    onChange={(e) => setCategoryId(e.target.value)}
                    >
                    <MenuItem value="">
                        <em>Seleccionar categoría</em>
                    </MenuItem>
                    {categories?.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                        {category.name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>

                <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Tipo de producto</InputLabel>
                    <Select
                    value={typeId}
                    label="Tipo"
                    onChange={(e) => setTypeId(e.target.value)}
                    >
                    <MenuItem value="">
                        <em>Seleccionar</em>
                    </MenuItem>
                    {types?.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                        {type.name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>

                <FormControlLabel
                    control={
                    <Checkbox
                        checked={visible}
                        onChange={(e) => setVisible(e.target.checked)}
                        color="primary"
                    />
                    }
                    label="Visible en tienda"
                    sx={{ mt: 1 }}
                />

                <FormControl fullWidth>
                    <FormLabel>Descripción</FormLabel>
                    <TextareaAutosize
                    minRows={4}
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
                    onChange={(e) => setProductDescripcion(e.target.value)}
                    />
                </FormControl>
            </Box>

            {/* Columna derecha */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                

                <ImageUploader onImagesChange={setImagenesSeleccionadas} />
            
                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                    <CropOutlinedIcon sx={{ color: 'action.active', mr: 1 }} />
                    <TextField
                        label="Tamaño"
                        variant="standard"
                        fullWidth
                        value={productSize}
                        onChange={(e) => setProductSize(e.target.value)}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                    <FitnessCenterOutlinedIcon sx={{ color: 'action.active', mr: 1 }} />
                    <TextField
                    label="Peso"
                    variant="standard"
                    fullWidth
                    value={productWeight}
                    onChange={(e) => setProductWeight(e.target.value)}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                    <ElectricBoltOutlinedIcon sx={{ color: 'action.active', mr: 1 }} />
                    <TextField
                    label="Potencia"
                    variant="standard"
                    fullWidth
                    value={productPower}
                    onChange={(e) => setProductPower(e.target.value)}
                    />
                </Box>

            </Box>
        </Box>
    </Box>

    );
});

export default ModalStoreUpdateProduct;
