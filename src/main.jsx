import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { StoreProvider } from './context/StoreProvider'
import router from './router'
import './index.css'
import { AdminProvider } from './context/AdminProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
  <AdminProvider >
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </AdminProvider>
</React.StrictMode>,
)
