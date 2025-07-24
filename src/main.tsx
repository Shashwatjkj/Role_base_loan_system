import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
const styles = {
  width:{
    width:'100vw',
  }
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={styles.width} >
    <App />
    </div>
  </StrictMode>,
)

