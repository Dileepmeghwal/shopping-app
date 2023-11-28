import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);

  const handleCounter=()=>{
    setCounter((preValue) => preValue + 1)
  }

  return (
    <CartContext.Provider value={{counter, handleCounter}}>
        {children}
    </CartContext.Provider>
  )
};
