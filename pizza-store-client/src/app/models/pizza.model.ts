export interface Pizza {
    pizzaId: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    isActive?: boolean;
    createdAt?: string;
}