import BudgetProjectRepo from "@/repository/BudgetProjectRepo";
import ExpenseService from "./ExpenseService";
import CookieService from "./CookieService";
import { v4 as uuidv4 } from 'uuid';
import type { IBudgetProject } from "@/interfaces/IBudgetProject";
import type { IExpenses } from "@/interfaces/IExpenses";

export default class BudgetProjectService {
    private budgetProjectRepo = new BudgetProjectRepo();

    public async getBudgetProject(): Promise<IBudgetProject[]> {
        const budgetProjects: IBudgetProject[] = await this.budgetProjectRepo.getBudgetProjects().then((responseBudgetProjects: IBudgetProject[]) => {
            return responseBudgetProjects;
        })
        return budgetProjects;
    }

    public async getBudgetProjectById(id: string): Promise<IBudgetProject> {
        const budgetProject: IBudgetProject = await this.budgetProjectRepo.getBudgetProjectById(id).then((response: IBudgetProject) => {
            return response;
        })
        return budgetProject;
    }

    public async getConsumedBudgetInPercent(budgetProject: IBudgetProject) {
        const expenseService = new ExpenseService();
        let consumedSum = 0;
        await expenseService.getAllExpensesForBudgetProject(budgetProject.id).then((response: IExpenses[]) => {
            response.forEach((expense: IExpenses) => {
                consumedSum += expense.expense;
            });
        })
        return 100 / budgetProject.budget * consumedSum;
    }

    public async saveNewBudgetBroject(title: string, budget: number, sharedWith: string[]): Promise<IBudgetProject> {
        const cookieService = new CookieService();
        sharedWith.push(cookieService.lastLogin);
        const newBudgetProject: IBudgetProject = {
            id: uuidv4(),
            title,
            budget,
            sharedWith,
            expenseGroupIDs: []
        };
        const newBudgetProjectResponse: IBudgetProject = await this.budgetProjectRepo.setNewBudgetProject(newBudgetProject).then((resonse: IBudgetProject) => {
            return resonse;
        });
        return newBudgetProjectResponse;
    }

    public async updateBudgetProject(oldBudgetProject: IBudgetProject, newTitle: string, newBudget: number, newSharedWith: string[]): Promise<IBudgetProject> {
        const cookieService = new CookieService();
        newSharedWith.push(cookieService.lastLogin);
        const updatedBudgetProject: IBudgetProject = {
            id: oldBudgetProject.id,
            title: newTitle,
            budget: newBudget,
            sharedWith: newSharedWith,
            expenseGroupIDs: oldBudgetProject.expenseGroupIDs,
        }
        const budgetProjectResponse = await this.budgetProjectRepo.updateBudgetProject(updatedBudgetProject).then((response: IBudgetProject) => {
            return response;
        })
        return budgetProjectResponse;
    }

    public async deleteBudgetProject(budgetProjectId: string): Promise<IBudgetProject> {
        const deletedBudgetProjectResponse: IBudgetProject = await this.budgetProjectRepo.deleteBudgetProject(budgetProjectId).then((response: IBudgetProject) => {
            return response;
        });
        return deletedBudgetProjectResponse
    }

}