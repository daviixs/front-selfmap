import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import maoImg from '../assets/images/mao.png'
import mapaImg from '../assets/images/mapa.png'

export default function MapaPage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('animate-fade-in')
    return () => {
      document.body.classList.remove('animate-fade-in')
    }
  }, [])

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
        <div id="mapa-container" aria-label="Mapa do supermercado">
          <img
            src={mapaImg}
            alt="Mapa do supermercado"
            className="imagem-mapa"
          />
        </div>
      </div>
    </section>
  )
}
