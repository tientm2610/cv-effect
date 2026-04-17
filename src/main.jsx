import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function SmoothScrollProvider({ children }) {
  useSmoothScroll()
  return children
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SmoothScrollProvider>
      <App />
    </SmoothScrollProvider>
  </StrictMode>,
)
