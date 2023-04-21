import type { IExpenses } from "./IExpenses";

export interface IExpenseGroup {
    "id": string,
    "budgetProjectId": string,
    "title": string,
    "percent": number,
    "color": string,
    "expenseIDs": string[],
}