import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import StartScreen from './components/StartScreen'
import CatalogoPage from './pages/CatalogoPage'
import MapaPage from './pages/MapaPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/mapa" element={<MapaPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)