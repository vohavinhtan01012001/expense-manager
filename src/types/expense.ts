export type ExpenseType = {
    id?: string; 
    date: string | Date; 
    expenseType: string;
    cost: number;
    quantity: number;
    note?: string;
}
