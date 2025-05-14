import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { StoreProvider } from './context/StoreProvider'
// import { AdminProvider } from './context/AdminProvider'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import router from './router'
import theme from './theme'
// import './index.css'
// import './static/fonts/fonts.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <AdminProvider> */}
        <StoreProvider>
          <RouterProvider router={router} />
        </StoreProvider>
      {/* </AdminProvider> */}
    </ThemeProvider>
  </React.StrictMode>
)
