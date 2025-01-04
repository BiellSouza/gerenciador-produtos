import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Hero from './sessions/Hero.jsx'
import DeshBoard from './sessions/DeshBoard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Hero />
    <DeshBoard/>
  </StrictMode>,
)
