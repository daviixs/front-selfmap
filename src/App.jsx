import { Routes, Route, Navigate } from 'react-router-dom'

import StartScreen from './pages/StartScreen'
import CatalogoPage from './pages/CatalogoPage'
import MapaPage from './pages/MapaPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/catalogo" element={<CatalogoPage />} />
      <Route path="/mapa" element={<MapaPage />} />
      {/* Redirecionamento para rota padrão */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
