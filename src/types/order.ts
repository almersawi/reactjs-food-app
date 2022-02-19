export type Order = {
    name: string;
    street: string;
    city: string;
    postalCode: string;
    date: Date;
    meals: {name: string, amount: number}[]; // array of meal names
    totalAmount: number;
}