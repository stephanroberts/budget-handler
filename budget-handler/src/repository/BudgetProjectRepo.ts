import axios from "axios";
import CookieService from "@/services/CookieService";
import type { IBudgetProject } from "@/interfaces/IBudgetProject";

export default class BudgetProjectRepo {
    public async getBudgetProjects(): Promise<IBudgetProject[]> {
        const cookieService = new CookieService();
        const budgetProjects: IBudgetProject[] = await axios({
            method: 'get',
            url: 'http://localhost:3000/budgetProjects'
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
            url: `http://localhost:3000/budgetProjects/${id}`
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        });
        return budgetProject;
    }

}