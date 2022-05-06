import React, { createContext, useReducer } from "react";
import { CartReducer, sumItems } from "./reducer";

export const CartContext = createContext<any>(null);

const storage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") as string)
  : [];
const deliveryMethod = localStorage.getItem("deliveryMethod")
  ? JSON.parse(localStorage.getItem("deliveryMethod") as string)
  : { fee: 0, discount: 0 };
const initialState = {
  cartItems: storage,
  ...sumItems(storage),
  checkout: false,
  deliveryMethod: deliveryMethod,
};

export const CartContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);
  const isInCart = (product: any) => {
    return !!state.cartItems?.find((item: any) => item.id === product.id);
  };

  const increase = (payload: any) => {
    dispatch({ type: "INCREASE", payload });
  };

  const decrease = (payload: any) => {
    dispatch({ type: "DECREASE", payload });
  };

  const addProduct = (payload: any) => {
    dispatch({ type: "ADD_ITEM", payload });
  };

  const removeProduct = (payload: any) => {
    dispatch({ type: "REMOVE_ITEM", payload });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const handleCheckout = () => {
    console.log("CHECKOUT", state);
    dispatch({ type: "CHECKOUT" });
  };

  const addDeliveryMethod = (payload: any) => {
    dispatch({ type: "ADD_DELIVERY_METHOD", payload });
  };

  const contextValues = {
    removeProduct,
    addProduct,
    increase,
    decrease,
    clearCart,
    handleCheckout,
    addDeliveryMethod,
    isInCart,
    ...state,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};
