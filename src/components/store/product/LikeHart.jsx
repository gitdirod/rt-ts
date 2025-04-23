import { 
    memo,
    useState 
} from "react"
import { useAuth } from "/src/hooks/useAuth"
import { Snackbar, Alert } from '@mui/material';
import { Box } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import request from '/src/services/request';
import BACKEND from "/src/data/backend";


const LikeHart =({product, size = 24})=> {
    
  
    const { user } = useAuth({middleware: 'guest'})
    const [stateLike, setStateLike] = useState(product?.like || false)


    const [errores, setErrores] = useState({})

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [snackSeverity, setSnackSeverity] = useState('success'); // success | error | warning

    const showSnack = (message, severity = 'success') => {
        setSnackMessage(message);
        setSnackSeverity(severity);
        setSnackOpen(true);
    };
    


    const sendLike = async (e) => {
        if(!user || !user?.email_verified_at){
            showSnack('Verifica tu cuenta para dar me gusta', 'warning');
            return
        }

        const response = await request(BACKEND.LIKES.KEY, 'POST', {product_id: product.id});
        if(response.success){
            setStateLike(response?.data?.data);
            showSnack(stateLike ? 'Ya no te gusta este producto' : '¡Te gusta este producto!');
        }else{
            setErrores(response.errors)
            showSnack('Ocurrió un error al guardar tu "me gusta"', 'error');
        }
        
    }
    
    return (
        <Box>
            <Snackbar
                open={snackOpen}
                autoHideDuration={3000}
                onClose={() => setSnackOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackOpen(false)}
                    severity={snackSeverity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackMessage}
                </Alert>
                </Snackbar>

            <FavoriteIcon
            onClick={sendLike} 
            sx={{
                width: size,
                color: stateLike ? 'primary.main' : 'grey.400',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.1)',
                }
            }}
            />
        </Box>
  )
}

export default memo(LikeHart)
