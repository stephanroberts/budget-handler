import BudgetProjectRepo from "@/repository/BudgetProjectRepo";
import type { IBudgetProject } from "@/interfaces/IBudgetProject";
import type { IExpenseGroup } from "@/interfaces/IExpenseGroup";
import type { IExpenses } from "@/interfaces/IExpenses";

export default class BudgetProjectService {
    public async getBudgetProject(): Promise<IBudgetProject[]> {
        const budgetProjectRepo = new BudgetProjectRepo();
        const budgetProjects: IBudgetProject[] = await budgetProjectRepo.getBudgetProjects().then((responseBudgetProjects: IBudgetProject[]) => {
            return responseBudgetProjects;
        })
        return budgetProjects;
    }

    public async getBudgetProjectById(id: string): Promise<IBudgetProject> {
        const budgetProjectRepo = new BudgetProjectRepo();
        const budgetProject: IBudgetProject = await budgetProjectRepo.getBudgetProjectById(id).then((response: IBudgetProject) => {
            return response;
        })
        return budgetProject;
    }

    public getConsumedBudgetInPercent(budgetProject: IBudgetProject) {
        let consumedSum = 0;
        budgetProject.expenseGroups.forEach((expenseGroup: IExpenseGroup) => {
            expenseGroup.expenses.forEach((expense: IExpenses) => {
                consumedSum += expense.expense;
            });
        });
        return 100 / budgetProject.budget * consumedSum;
    }

}