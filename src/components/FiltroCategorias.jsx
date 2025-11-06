import React from 'react'

export default function FiltroCategorias({ categorias, selecionadas, setSelecionadas }) {
  const toggleCategoria = (cat) => {
    setSelecionadas(prev =>
      prev.includes(cat)
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    )
  }

  return (
    <div className="barra-filtros">
      <h2>Categorias</h2>
      <ul>
        {categorias.map(cat => {
          const selecionado = selecionadas.includes(cat)
          return (
            <li
              key={cat}
              onClick={() => toggleCategoria(cat)}
              className={`filtro-item ${selecionado ? 'selecionado' : ''}`}
            >
              {cat}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
