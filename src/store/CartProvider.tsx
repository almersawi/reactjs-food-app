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
        const item = action.payload as Meal;
        const existedItemIndex = state.items.findIndex(i => i.id === item.id);
        const existedItem = state.items[existedItemIndex];
        const updatedTotalAmount = state.totalAmount + item.price * (item.amount ?? 0);
        let updatedItems;
        if(existedItem) {
            const updatedItem = {
                ...existedItem,
                amount: (existedItem.amount ?? 0) + (item.amount ?? 1)
            }
            updatedItems = [...state.items];
            updatedItems[existedItemIndex] = updatedItem;
        }
        else {
            updatedItems = state.items.concat(item);
        }

        const newState = { ...state, items: updatedItems, totalAmount: updatedTotalAmount };
        return newState;
    }

    else if(action.type === 'REMOVE_ITEM') {
        const id = action.payload as string;
        const existedItemIndex = state.items.findIndex(i => i.id === id);
        let updatedTotalAmount;
        let updatedItems;
        debugger;
        if(existedItemIndex !== -1) {
            updatedItems = [...state.items];
            let itemToEdit = updatedItems[existedItemIndex];
            if(itemToEdit.amount === 1) {
                updatedItems = state.items.filter(item => item.id !== id);
            }
            else {
                const updatedItem = { ...itemToEdit, amount: (itemToEdit.amount ?? 1) - 1 };
                updatedItems[existedItemIndex] = updatedItem;
            }
            updatedTotalAmount = state.totalAmount - itemToEdit.price;
        }

        const newState = { ...state, items: updatedItems ?? state.items, totalAmount: updatedTotalAmount ?? state.totalAmount };

        return newState;
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