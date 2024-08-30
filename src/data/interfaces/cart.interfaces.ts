import { Status } from '../enums/status.enum';

export interface Cart {
    id: string;
    title: string;
    description: string;
    created_at: string;
    status: Status;
    itemsLength: number;
}