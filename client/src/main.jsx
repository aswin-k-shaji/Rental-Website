import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopeContextProvider from './context/ShopeContext.jsx'
import {CategoryProvider} from './context/CategoryContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
  <ShopeContextProvider>
    <CategoryProvider>
    <App/>
    </CategoryProvider>
  </ShopeContextProvider>
  </BrowserRouter>
)
