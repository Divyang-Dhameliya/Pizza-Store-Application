export interface OrderItem {
    pizzaId: number;
    quantity: number;
    unitPrice: number;
}

export interface PlaceOrderRequest {
    items: OrderItem[];
}

export interface Order {
    orderId: number;
    orderDate: string;
    totalAmount: number;
    status: string;
}

export interface OrderDetailItem {
    orderItemId: number;
    pizzaId: number;
    pizzaName: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
}