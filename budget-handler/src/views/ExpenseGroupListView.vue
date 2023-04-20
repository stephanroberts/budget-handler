<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBudgetProjectStore } from '@/stores/budgetProject'
import BudgetProjectService from '@/services/BudgetProjectService';
import type { IBudgetProject } from '@/interfaces/IBudgetProject';
import ExpenseGroupListItemComponent from '@/components/ExpenseGroupListItemComponent.vue';

const route = useRoute();
const budgetProjectStore = useBudgetProjectStore();

onMounted(async () => {
    const budgetProjectService = new BudgetProjectService();
    const id = route.params.id as string;
    await budgetProjectService.getBudgetProjectById(id).then((budgetProjectResponse: IBudgetProject) => {
        budgetProjectStore.budgetProject = budgetProjectResponse;
    });
})

</script>

<template>
    <div class="content-container">
        <main class="card">
            <ExpenseGroupListItemComponent v-for="expenseGroup in budgetProjectStore.budgetProject?.expenseGroups"
                :expense-group="expenseGroup" :budget-sum="budgetProjectStore.budgetProject?.budget as number"></ExpenseGroupListItemComponent>
        </main>
    </div>
</template>

<style scoped>
.content-container {
    width: 100%;
    display: flex;
    justify-content: center;
}

.card {
    background-color: var(--purple-white);
    padding: 2.4rem;
    text-align: start;
    border-radius: 6.6rem;
    position: fixed;
    top: 9.6rem;
    bottom: 10.8rem;
    overflow-y: auto;
}

@media screen and (max-width: 800rem) {
    .card {
        max-width: 75.8rem;
        right: 2.4rem;
        left: 2.4rem;
        margin: auto;
    }

}
</style>