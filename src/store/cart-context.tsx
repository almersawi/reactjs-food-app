import React from "react";
import { CartContextProps } from "../types/cart-context";

const CartContext = React.createContext<CartContextProps>({
    items: [],
    totalAmount: 0,
    addItem: () => {},
    removeItem: () => {}
})

export default CartContext;