import axios from "axios";
import CookieService from "@/services/CookieService";
import type { IBudgetProject } from "@/interfaces/IBudgetProject";

export default class BudgetProjectRepo {
    private url = 'http://localhost:3000/budgetProjects';

    public async getBudgetProjects(): Promise<IBudgetProject[]> {
        const cookieService = new CookieService();
        const budgetProjects: IBudgetProject[] = await axios({
            method: 'get',
            url: this.url,
        }).then((response) => {
            const responseBudgetProject: IBudgetProject[] = response.data;
            const relevantUser = cookieService.lastLogin;
            const sharedBudgetProject: IBudgetProject[] = [];
            responseBudgetProject.forEach((budgetProject: IBudgetProject) => {
                const isSharedWithUser = budgetProject.sharedWith.indexOf(relevantUser);
                if (isSharedWithUser !== -1) {
                    sharedBudgetProject.push(budgetProject);
                }
            });
            return sharedBudgetProject;
        });
        return budgetProjects;
    }

    public async getBudgetProjectById(id: string): Promise<IBudgetProject> {
        const budgetProject: IBudgetProject = await axios({
            method: 'get',
            url: `${this.url}/${id}`
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        });
        return budgetProject;
    }

    public async setNewBudgetProject(newBudgetProject: IBudgetProject): Promise<IBudgetProject> {
        const newBudgetProjectResponse: IBudgetProject = await axios({
            method: 'post',
            url: this.url,
            data: newBudgetProject,
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        });
        return newBudgetProjectResponse;
    }

    public async updateBudgetProject(updatedBudgetProject: IBudgetProject): Promise<IBudgetProject> {
        const updatedBudgetProjectResponse: IBudgetProject = await axios({
            method: 'patch',
            url: `${this.url}/${updatedBudgetProject.id}`,
            data: updatedBudgetProject,
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        });
        return updatedBudgetProjectResponse;
    }

    public async deleteBudgetProject(budgetProjectId: string): Promise<IBudgetProject> {
        const deletedBudgetProject: IBudgetProject = await axios({
            method: 'delete',
            url: `${this.url}/${budgetProjectId}`,
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        });
        return deletedBudgetProject;
    } 

}