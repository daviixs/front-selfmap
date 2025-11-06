import React from 'react'

export default function ProdutoCard({ produto, alterarQtd }) {
  return (
    <div className="produto">
      <img src={produto.img} alt={produto.nome} />
      <h3>{produto.nome}</h3>
      <p>Qtd: <span id={`qtd-${produto.id}`}>{produto.qtd}</span></p>
      <p>Estoque: <span id={`estoque-${produto.id}`}>{produto.estoque}</span></p>
      <p className="preco">Preço: <strong>R$ {produto.preco.toFixed(2)}</strong></p>
      <div className="controles">
        <button onClick={() => alterarQtd(produto.id, -1)}>‑</button>
        <button onClick={() => alterarQtd(produto.id, 1)}>+</button>
      </div>
    </div>
  )
}
