import { ref } from "vue";
import { defineStore } from "pinia";
import type { IBudgetProject } from "@/interfaces/IBudgetProject";

export const useOverlayStore = defineStore('overlayStore', () => {
    const isOverlayOpen = ref<boolean>(false);
    const budgetProjectToEdit = ref<IBudgetProject>();

    return {
        isOverlayOpen,
        budgetProjectToEdit
    }
})