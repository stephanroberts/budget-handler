import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IBudgetProject } from '@/interfaces/IBudgetProject';

export const useBudgetProjectStore = defineStore('budgetProjectStore', () => {
    const budgetProject = ref<IBudgetProject>();

    return {
        budgetProject
    }
})