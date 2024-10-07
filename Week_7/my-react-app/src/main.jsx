import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import HelloWorld from './components/HelloWorld.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <HelloWorld name="Jake" age='23' days='3000' />
    <HelloWorld name="Jake" age='23' days='3000' />
    <HelloWorld name="Jake" age='23' days='3000' />
  </StrictMode>,
)
