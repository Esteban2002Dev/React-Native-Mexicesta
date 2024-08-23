import { Status } from "../enums/status.enum";

export interface Item {
    id: string;
    name: string;
    price?: number;
    quantity?: string;
    image?: string;
    description?: string;
    status: Status;
    cartId: string;
}