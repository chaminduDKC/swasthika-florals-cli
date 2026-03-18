import "./index.css"

import { Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import CategoryGallery from './components/CategoryGallery.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/"                    element={<Home />} />
      <Route path="/category/:id"        element={<CategoryGallery />} />
    </Routes>
  )
}