import { ref } from 'vue';
import { defineStore } from 'pinia';
import BudgetProjectService from '@/services/BudgetProjectService';
import type { IBudgetProject } from '@/interfaces/IBudgetProject';

export const useBudgetProjectStore = defineStore('budgetProjectStore', () => {
    const budgetProject = ref<IBudgetProject>();
    const budgetProjects = ref<IBudgetProject[]>([]);

    async function storeBudgetProjectsFromApiInStore() {
        const budgetProjectService = new BudgetProjectService();
        await budgetProjectService.getBudgetProject().then((budgetProjectsResponse: IBudgetProject[]) => {
            budgetProjects.value = budgetProjectsResponse.filter((budgetProject: IBudgetProject) => budgetProject);
        })
    }

    return {
        budgetProject,
        budgetProjects,
        storeBudgetProjectsFromApiInStore
    }
})