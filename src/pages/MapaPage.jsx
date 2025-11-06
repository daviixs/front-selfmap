import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import maoImg from '../assets/images/mao.png'
import mapaImg from '../assets/images/mapa.png'
import { getMapForProducts } from '../services/api'

export default function MapaPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const produtosSelecionados = location.state?.produtosSelecionados || []
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pontos, setPontos] = useState([])

  useEffect(() => {
    document.body.classList.add('animate-fade-in')
    return () => {
      document.body.classList.remove('animate-fade-in')
    }
  }, [])

  // Carrega coordenadas dos produtos selecionados
  useEffect(() => {
    const loadMapData = async () => {
      if (produtosSelecionados.length === 0) {
        setPontos([])
        return
      }

      try {
        setLoading(true)
        setError(null)
        const productIds = produtosSelecionados.map(p => p.id)
        const mapData = await getMapForProducts(productIds)
        
        // Extrai pontos das coordenadas retornadas e adiciona nomes dos produtos selecionados
        if (mapData.coordinates && Array.isArray(mapData.coordinates)) {
          const pontosComNomes = mapData.coordinates.map(coord => {
            const produto = produtosSelecionados.find(p => p.id === coord.id)
            return {
              ...coord,
              name: produto?.nome || coord.name || `Produto ${coord.id}`
            }
          })
          setPontos(pontosComNomes)
        } else {
          setPontos([])
        }
      } catch (err) {
        console.error('Erro ao carregar mapa:', err)
        setError('Erro ao carregar mapa. Verifique se a API está rodando.')
      } finally {
        setLoading(false)
      }
    }

    loadMapData()
  }, [produtosSelecionados])

  const handleVoltar = () => {
    document.body.classList.add('animate-fade-out')
    setTimeout(() => {
      navigate('/catalogo')
    }, 400)
  }

  return (
    <section id="mapa-section" className="tela-inicial" style={{ margin: 0, padding: 0 }}>
      <div className="mapa-header">
        <button
          onClick={handleVoltar}
          className="voltar-btn"
          style={{ position: 'absolute', left: '16px', top: '10px' }}
        >
          <img src={maoImg} alt="ícone voltar" className="icon" />
          VOLTAR
        </button>
      </div>

      <div className="mapa-main">
        <div id="mapa-container" aria-label="Mapa do supermercado" style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src={mapaImg}
            alt="Mapa do supermercado"
            className="imagem-mapa"
          />
          {loading && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(255,255,255,0.9)', padding: '1rem', borderRadius: '8px' }}>
              Carregando mapa...
            </div>
          )}
          {error && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(255,0,0,0.9)', color: 'white', padding: '1rem', borderRadius: '8px' }}>
              {error}
            </div>
          )}
          {!loading && !error && pontos.map((ponto, idx) => (
            <div
              key={ponto.id || idx}
              style={{
                position: 'absolute',
                left: `${ponto.coordinates.x}%`,
                top: `${ponto.coordinates.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 10
              }}
            >
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }} />
              {ponto.name && (
                <div style={{
                  marginTop: '4px',
                  padding: '2px 6px',
                  background: 'rgba(255,255,255,0.9)',
                  borderRadius: '4px',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  border: '1px solid #ddd'
                }}>
                  {ponto.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
