import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import './css/reset.css'
import './css/colors.css'
import './index.css'
import { CartProvider } from './contexts/cartContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CartProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </CartProvider>

)
