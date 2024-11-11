import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/Context/Auth.tsx'
import { ItemsContextProvider } from './components/Context/Items.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ItemsContextProvider>
          <App />
        </ItemsContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
