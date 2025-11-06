import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import maoImg from '../assets/images/mao.png'
import arroz1Img from '../assets/images/arroz1.png'
import arroz2Img from '../assets/images/arroz2.png'
import achocolatadoImg from '../assets/images/achocolatado.png'
import repelenteImg from '../assets/images/repelente.png'
import sabaoImg from '../assets/images/sabao.png'
import carneImg from '../assets/images/carne.png'
import HeaderCatalogo from '../components/HeaderCatalogo'
import FiltroCategorias from '../components/FiltroCategorias'
import ProdutoCard from '../components/ProdutoCard'
import { getProducts } from '../services/api'

// Mapeamento de IDs para imagens
const imageMap = {
  1: arroz1Img,
  2: arroz2Img,
  3: achocolatadoImg,
  4: repelenteImg,
  5: sabaoImg,
  6: carneImg
}

export default function CatalogoPage() {
  const navigate = useNavigate()
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filtroNome, setFiltroNome] = useState('')
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([])

  // Carrega produtos do backend
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const productsData = await getProducts()
        // Mapeia dados do backend para formato do frontend
        const produtosFormatados = productsData.map(p => ({
          id: p.id,
          nome: p.name,
          preco: p.preco,
          img: imageMap[p.id] || arroz1Img, // Fallback para primeira imagem
          qtd: 0,
          estoque: p.estoque,
          categoria: p.category
        }))
        setProdutos(produtosFormatados)
      } catch (err) {
        console.error('Erro ao carregar produtos:', err)
        setError('Erro ao carregar produtos. Verifique se a API está rodando.')
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const handleVoltar = () => {
    document.body.classList.add('animate-fade-out')
    setTimeout(() => {
      navigate('/')
    }, 600)
  }

  // É bom fazer efeito para animação fade‑in no mount
  useEffect(() => {
    document.body.classList.add('animate-fade-in')
    return () => {
      document.body.classList.remove('animate-fade-in')
    }
  }, [])

  const produtosFiltrados = useMemo(() => {
    return produtos.filter(p =>
      p.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
      (categoriasSelecionadas.length === 0 || categoriasSelecionadas.includes(p.categoria))
    )
  }, [produtos, filtroNome, categoriasSelecionadas])

  const alterarQtd = (id, valor) => {
    setProdutos(prev =>
      prev.map(p => {
        if (p.id === id) {
          if (valor === 1 && p.qtd < p.estoque) {
            return { ...p, qtd: p.qtd + 1 }
          }
          if (valor === -1 && p.qtd > 0) {
            return { ...p, qtd: p.qtd - 1 }
          }
        }
        return p
      })
    )
  }

  const totalItens = useMemo(() => produtos.reduce((acc, p) => acc + p.qtd, 0), [produtos])
  
  const saldo = useMemo(() => 
    produtos.reduce((acc, p) => acc + (p.qtd * p.preco), 0)
  , [produtos])

  const handleIrParaMapa = () => {
    // Filtra produtos selecionados (qtd > 0)
    const produtosSelecionados = produtos.filter(p => p.qtd > 0)
    // Navega para o mapa passando os produtos selecionados
    navigate('/mapa', { state: { produtosSelecionados } })
  }

  if (loading) {
    return (
      <section className="tela-inicial" style={{ width: '100%', height: '100vh', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <p>Carregando produtos...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="tela-inicial" style={{ width: '100%', height: '100vh', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ color: 'red' }}>{error}</p>
      </section>
    )
  }

  return (
    <section className="tela-inicial" style={{ width: '100%', height: '100vh', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
      <HeaderCatalogo
        maoImg={maoImg}
        onVoltar={handleVoltar}
        filtroNome={filtroNome}
        setFiltroNome={setFiltroNome}
        totalItens={totalItens}
        onIrParaMapa={handleIrParaMapa}
      />

      <div className="conteudo-catalogo">
        <FiltroCategorias
          categorias={["Alimentos","Bebidas","Limpeza","Higiene","Carnes e Frios"]}
          selecionadas={categoriasSelecionadas}
          setSelecionadas={setCategoriasSelecionadas}
        />

        <main id="catalogo">
          {produtosFiltrados.map(prod => (
            <ProdutoCard key={prod.id} produto={prod} alterarQtd={alterarQtd} />
          ))}
        </main>
      </div>

      <footer>
        Saldo: R$ <span id="saldo">{saldo.toFixed(2)}</span>
      </footer>
    </section>
  )
}
