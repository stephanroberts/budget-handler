import type { IExpenses } from "./IExpenses";

export interface IExpenseGroup {
    "title": string,
    "percent": number,
    "color": string,
    expenses: IExpenses[],
}