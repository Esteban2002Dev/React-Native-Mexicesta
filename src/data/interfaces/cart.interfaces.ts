import { Status } from "../enums/status.enum";
import { it } from '@jest/globals';
import { Item } from "./item.interface";

export interface Cart {
    id: string;
    title: string;
    description: string;
    created_at: string;
    status: Status;
    itemsLength?: number;
}