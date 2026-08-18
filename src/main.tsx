import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import './index.css'
import App from './App.tsx'

// Dev-only QA hook: lets automated checks drive the ticker when the
// browser tab is occluded (Chrome suspends rAF for hidden windows).
if (import.meta.env.DEV) {
  ;(window as unknown as { __gsap: typeof gsap }).__gsap = gsap
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
