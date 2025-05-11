import { Box, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { UserService } from '/src/services/UserService';
import { formatearFecha } from '/src/helpers';

export default function IndexMemory(){

    const{data:users}=UserService.useAllUsers(true)

    return (

        <Box className="flex flex-col flex-1 overflow-hidden">
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 1,
                    my: 1,
                    bgcolor: 'white',
                    borderRadius: 1,
                    border: '1px solid #ccc'
                }}
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Person2OutlinedIcon color="primary" />
                    <Typography variant="h5" fontWeight="bold">
                        Usuarios
                    </Typography>
                    <Chip variant="outlined" label={users.length} color="primary" />
                </Stack>
            </Box>


            <Paper sx={{ width: '100%', overflow: 'hidden', overflowY:'auto', p:1, border:"1px solid #ccc" }}>
            <TableContainer  sx={{ maxHeight: 'calc(100vh - 95px)', overflowY: 'auto', borderRadius: 2 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow >
                    <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                            Id
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                        Nombre
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                            Email
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                            Telefonos
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                            Rol
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                            Verificado
                        </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(users || []).map((user, index) => (
                    <TableRow 
                      key={index}
                      hover
                      sx={{
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease-in-out',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.05)', // claro en light mode
                        }
                      }}
                    >
                      
                        <TableCell><Typography variant="body2">{user?.id}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{user?.name}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{user?.email}</Typography></TableCell>
                        <TableCell>
                            <Typography variant="body2">{user.phones && user.phones.length > 0
                                ? user.phones.join(', ')
                                : '-'}
                            </Typography>
                        </TableCell>
                        <TableCell><Typography variant="body2">{user?.role}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{formatearFecha(user?.email_verified_at)}</Typography></TableCell>
                        
                    </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
  )
}