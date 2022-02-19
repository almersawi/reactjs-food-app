import { Meal } from "./meal";

export type CartContextProps = {
    items: Meal[],
    totalAmount: number,
    addItem: (item: Meal) => void,
    removeItem: (id: string) => void,
    clear: () => void
}