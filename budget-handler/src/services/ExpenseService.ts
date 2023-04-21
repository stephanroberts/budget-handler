import type { IExpenses } from "@/interfaces/IExpenses";
import ExpensesRepo from "@/repository/ExpensesRepo";

export default class ExpenseService {
    private expenseRepo = new ExpensesRepo();

    public async getAllExpensesForBudgetProject(bdugetProjectId: string): Promise<IExpenses[]> {
        const expensesForBudgetProject: IExpenses[] = [];
        await this.expenseRepo.getAllExpenses().then((response: IExpenses[]) => {
            response.forEach((expense: IExpenses) => {
                if (expense.budgetProjectId === bdugetProjectId) {
                    expensesForBudgetProject.push(expense);
                }
            });
        });
        return expensesForBudgetProject;
    }
}