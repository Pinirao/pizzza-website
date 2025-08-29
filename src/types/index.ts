export interface Pizza {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

export interface CartItem {
    pizza: Pizza;
    quantity: number;
}