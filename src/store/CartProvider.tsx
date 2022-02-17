import { CartContextProps } from "../types/cart-context";
import { Meal } from "../types/meal";
import CartContext from "./cart-context";
import { useReducer } from "react";

type Props = {
    children: React.ReactNode
}

type action = {
    type: 'ADD_ITEM' | 'REMOVE_ITEM'
    payload: Meal | string
}

const defaultCartState: CartContextProps = {
    items: [],
    totalAmount: 0,
    addItem: () => {},
    removeItem: () => {}
}

const cartReducer = (state: CartContextProps, action: action) => {
    if(action.type === 'ADD_ITEM') {
        console.log("Add Item")
        const item = action.payload as Meal;
        // const itemExist = state.items.find(x => x.id === item.id);
        const updatedItems = state.items.concat(item);
        const updatedTotalAmount = state.totalAmount + item.price * (item.amount ?? 0);
        const newState = { ...state, items: updatedItems, totalAmount: updatedTotalAmount };
        return newState;
    }

    else if(action.type === 'REMOVE_ITEM') {
        const id = action.payload as string;
        const item = state.items.find(item => item.id === id);
        if(item) {
            (item.amount as number)--;
            if(item.amount === 0) {
                state.items = state.items.filter(item => item.id !== id);
            }
            state.totalAmount -= item.price;
        }
        return state;
    }

    return defaultCartState;

}

const CartProvider = ({ children } : Props) => {
    const [ cartState, dispacthCartAction ] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandeler = (item: Meal) => {
        dispacthCartAction({ type: 'ADD_ITEM', payload: item });
        console.log(cartContext)
    }

    const removeItemFromCartHandeler = (id: string) => {
        dispacthCartAction({ type: 'REMOVE_ITEM', payload: id });
    }

    const cartContext: CartContextProps = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandeler,
        removeItem: removeItemFromCartHandeler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;