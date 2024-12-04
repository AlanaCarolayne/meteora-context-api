import React, { createContext, useReducer, useState } from "react";
import { carrinhoReducer } from "../reducers/carrinhoReducer";
import { useMemo } from "react";
import { useEffect } from "react";

// criando o context
export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

const estadoInicial = [];
export const CarrinhoProvider = ({ children }) => {
  const [carrinho, dispatch] = useReducer(carrinhoReducer, estadoInicial);
  const [quant, setQuant] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

  const { totalTemp, quantTemp } = useMemo(() => {
    return carrinho.reduce(
      (acc, produto) => ({
        quantTemp: acc.quantTemp + produto.quantidade,
        totalTemp: acc.totalTemp + produto.preco * produto.quantidade,
      }),
      {
        quantTemp: 0,
        totalTemp: 0,
      }
    );
  });

  useEffect(() => {
    setQuant(quantTemp);
    setValorTotal(totalTemp);
  }, [carrinho]);

  return (
    <CarrinhoContext.Provider value={{ carrinho, dispatch, quant, valorTotal }}>
      {children}
    </CarrinhoContext.Provider>
  );
};
