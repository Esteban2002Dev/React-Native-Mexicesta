import { Status } from "../enums/status.enum";

export interface Item {
    id: number;
    name: string;
    price?: number;
    quantity?: number;
    image?: string;
    description?: string;
    status: Status;
}