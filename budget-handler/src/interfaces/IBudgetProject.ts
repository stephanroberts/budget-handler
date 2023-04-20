import type { IExpenseGroup } from "./IExpenseGroup";

export interface IBudgetProject {
    "id": string,
    "title": string,
    "budget": number,
    "sharedWith": string[],
    expenseGroups:IExpenseGroup[],
}