import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import './style/tailwind.css'
import Providers from './app/Providers.tsx'
import ToastContainer from './components/ui/Toaster.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
        <App />
          <ToastContainer />
    </Providers>
 </StrictMode>
)
