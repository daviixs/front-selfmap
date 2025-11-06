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

const produtosIniciais = [
  { id: 1, nome: "Arroz Agulhinha Broto Legal 5kg Tipo 1", preco: 23.9, img: arroz1Img, qtd: 0, estoque: 10, categoria: "Alimentos" },
  { id: 2, nome: "Arroz Agulhinha Prato Fino 5kg Tipo 1", preco: 27.9, img: arroz2Img, qtd: 0, estoque: 8, categoria: "Alimentos" },
  { id: 3, nome: "Achocolatado em Pó Original Toddy 370G", preco: 9.75, img: achocolatadoImg, qtd: 0, estoque: 5, categoria: "Alimentos" },
  { id: 4, nome: "Repelente OFF! Family Aerossol 170ml", preco: 36.8, img: repelenteImg, qtd: 0, estoque: 7, categoria: "Limpeza" },
  { id: 5, nome: "Sabão em Pó Omo Lavagem Perfeita 4kg", preco: 47.9, img: sabaoImg, qtd: 0, estoque: 9, categoria: "Limpeza" },
  { id: 6, nome: "Carne Bovina Maturatta Bife Ancho 1,600 kg", preco: 73.44, img: carneImg, qtd: 0, estoque: 6, categoria: "Carnes e Frios" },
]

export default function CatalogoPage() {
  const navigate = useNavigate()
  const [produtos, setProdutos] = useState(produtosIniciais)
  const [filtroNome, setFiltroNome] = useState('')
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([])

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

  return (
    <section className="tela-inicial" style={{ width: '100%', height: '100vh', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
      <HeaderCatalogo
        maoImg={maoImg}
        onVoltar={handleVoltar}
        filtroNome={filtroNome}
        setFiltroNome={setFiltroNome}
        totalItens={totalItens}
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
