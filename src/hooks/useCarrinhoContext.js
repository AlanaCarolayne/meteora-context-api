import { useContext, useEffect, useMemo } from "react";
import { CarrinhoContext } from "../context/CarrinhoContext";
import {
  ADD_PRODUTO,
  REMOVE_PRODUTO,
  ATT_QUANTIDADE,
} from "../reducers/carrinhoReducer";

const addProdutoAction = (novoProduto) => ({
  type: ADD_PRODUTO,
  payload: novoProduto,
});

const removeProdutoAction = (id) => ({
  type: REMOVE_PRODUTO,
  payload: id,
});
const attProdutoAction = (id, quant) => ({
  type: ATT_QUANTIDADE,
  payload: { id, quant },
});

export const useCarrinhoContext = () => {
  const { carrinho, dispatch, quant, valorTotal } = useContext(CarrinhoContext);

  function adicionarProduto(novoProduto) {
    dispatch(addProdutoAction(novoProduto));
  }

  function removerProduto(id) {
    const produto = carrinho.find((item) => item.id === id);

    if (produto && produto.quantidade > 1) {
      dispatch(attProdutoAction(id, produto.quantidade - 1));
    } else {
      dispatch(removeProdutoAction(id));
    }
  }

  function removerProdutoCarrinho(id) {
    dispatch(removeProdutoAction(id));
  }
 
  return {
    carrinho,
    quant,
    valorTotal,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho,
  };
};
