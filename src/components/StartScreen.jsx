import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import maoImg from '../assets/images/mao.png'

export default function StartScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('animate-fade-in')
    return () => {
      document.body.classList.remove('animate-fade-in')
    }
  }, [])

  const handleClick = () => {
    document.body.classList.add('animate-fade-out')
    setTimeout(() => {
      navigate('/catalogo')
    }, 600)
  }

  return (
    <section className="tela-inicial" style={{ width: '100%', height: '100vh', margin: 0, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button
        id="btnIniciar"
        onClick={handleClick}
      >
        <img src={maoImg} alt="ícone foguete" className="icon" />
        Iniciar
      </button>
    </section>
  )
}
