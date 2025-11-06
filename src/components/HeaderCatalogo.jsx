import React from 'react'

export default function HeaderCatalogo({ maoImg, onVoltar, filtroNome, setFiltroNome, totalItens, onIrParaMapa }) {
  return (
    <header>
      <button
        onClick={onVoltar}
        className="voltar-btn"
      >
        <img src={maoImg} alt="ícone voltar" className="icon" />
        VOLTAR
      </button>

      <input
        type="text"
        value={filtroNome}
        onChange={e => setFiltroNome(e.target.value)}
        placeholder="Pesquisar produtos..."
      />

      <div className="mapa-btn-container">
        <button
          id="mapBtn"
          onClick={onIrParaMapa}
        >
          <img src={maoImg} alt="ícone mapa" className="icon" />
          MAPA
        </button>
        {totalItens > 0 && (
          <span className="notificacao-badge">
            {totalItens}
          </span>
        )}
      </div>
    </header>
  )
}
