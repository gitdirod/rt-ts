import { useAuth } from "/src/hooks/useAuth";
import IsLoading from "/src/components/store/common/IsLoading";
import TittleName from "/src/components/store/common/TittleName";
import { SoldOrderService } from "/src/services/SoldOrderService";
import { formatearDinero, timeToText } from "/src/helpers";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from '@mui/material';
import { useNavigate } from "react-router-dom";


export default function Bought(){

  const navigate = useNavigate()
  const handleClick = (order) => {
    // handleClikCategoryCurrent(categoria?.id);
    // handleSetMenu(false);
    navigate(`/store/bought/${order.id}`);
  };
  
  
  const {data:soldOrders} = SoldOrderService.useAllSoldOrders()

  const { user } = useAuth({
    middleware: 'auth',
    url: '/'
  })

  if(user === undefined) return(<IsLoading/>)

  return (
    <Container maxWidth="lg" sx={{py:6}}>
      <TittleName>
        Mis compras
      </TittleName>
      <TableContainer component={Paper} sx={{ mx: 'auto', my: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Fecha</strong></TableCell>
              <TableCell align="right"><strong>Total</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {soldOrders?.map((order) => (
              <TableRow 
                sx={{cursor:'pointer'}}
                key={order.id}
                onClick={() => {
                  handleClick(order); // por ejemplo, abrir modal de vista
                }}
              >
                <TableCell>#{order.id}</TableCell>
                <TableCell>
                  {timeToText(order.created_at, 'dddd D [de] MMMM [de] YYYY - HH:mm')}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {formatearDinero(order.total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
