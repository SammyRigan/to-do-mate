export interface ITask {
    id: string;
    date: string;
    completedDate: string;
    title: string;
    status: string;
    priorityLevel?: string; // low / medium / high
    listId?: string;
    recurring?: boolean;
    recurringPeriod?: string; // daily / monthly / weekly / yearly
}

export interface IToBuy {
    id: string;
    date: string;
    boughtDate: string;
    title: string;
    status: string;
    listId?: string;
    recurring?: boolean;
    recurringPeriod?: string; // daily / monthly / weekly / yearly
    amount?: number;
}

export interface IList {
    id: string;
    date: string;
    title: string;
    itemsNum: number;
    totalAmount?: number;
    recurring: boolean;
    recurringPeriod?: string; // daily / monthly / weekly / yearly
    type?: string;
}