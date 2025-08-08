import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SidebarProvider } from './context/SidebarContext';
import AppContextProvider from './context/AppContext.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SidebarProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </SidebarProvider>
  </BrowserRouter>,
)
