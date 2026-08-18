import Home from './pages/Home'

/**
 * Single-route concept homepage.
 * No react-router: BrowserRouter broke GitHub Pages at /bic-homepage/
 * ("No routes matched location") and is unnecessary for one page.
 */
export default function App() {
  return <Home />
}
