import type { IExpenseGroup } from "@/interfaces/IExpenseGroup";
import type { IExpenses } from "@/interfaces/IExpenses";

export default class ExpenseGroupService {
    private expenseGroup: IExpenseGroup;

    constructor(expenseGroup: IExpenseGroup) {
        this.expenseGroup = expenseGroup;
    }
    public getPercentAsSumBasedOnBudget(budget: number): number {
        return budget * this.expenseGroup.percent / 100;
    }
    public getPercentConsumedFromGroupBudget(groupBudget: number): number {
        let consumedSum:number = 0;
        this.expenseGroup.expenses.forEach((expense: IExpenses) => {
            consumedSum += expense.expense;
        });
        return 100 / groupBudget * consumedSum;
    }
}