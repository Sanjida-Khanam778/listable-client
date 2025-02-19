import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './Provider/AuthProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>

      {/* <Toaster /> */}
      <RouterProvider router={router} />

  </AuthProvider>
</StrictMode>
)
