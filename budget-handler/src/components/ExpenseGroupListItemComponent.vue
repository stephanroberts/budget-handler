<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ExpenseGroupService from '@/services/ExpenseGroupService'
import type { IExpenseGroup } from '@/interfaces/IExpenseGroup';
import ExpenseItemComponent from '@/components/ExpenseItemComponent.vue'


const props = defineProps<{
    budgetSum: number;
    expenseGroup: IExpenseGroup;
}>();

const expenseGroupService = new ExpenseGroupService(props.expenseGroup);

const expenseGroupBudget = ref<number>(0);
const percentConsumedFromGroupBudget = ref<number>(0);

onMounted(() => {
    expenseGroupBudget.value = expenseGroupService.getPercentAsSumBasedOnBudget(props.budgetSum);
    percentConsumedFromGroupBudget.value = expenseGroupService.getPercentConsumedFromGroupBudget(expenseGroupBudget.value);
});

</script>

<template>
    <div class="container">
        <main class="card">
            <div class="expense-group-information">
                <div class="header">
                    <div class="title">
                        <div class="color"></div>
                        <h3>{{ props.expenseGroup.title }}</h3>
                    </div>
                    <div class="icon-btn">
                        <img src="@/assets/icons/edit-icon.svg" alt="edit-icon">
                    </div>
                </div>
                <p class="caption">
                    {{ expenseGroup.percent }}% - {{ expenseGroupBudget }} €
                </p>
            </div>
            <ExpenseItemComponent v-for="expense in expenseGroup.expenses" :expense-item="expense"></ExpenseItemComponent>
            <hr>
            <p>{{ $t('Sum') }} {{ expenseGroupService.getExpenseSum().toLocaleString('de-DE') }} €</p>
            <p class="caption"> {{ percentConsumedFromGroupBudget.toLocaleString('de-DE', { maximumFractionDigits: 0}) }} {{ $t('of') }} {{ expenseGroup.percent }}% {{ $t('consumed') }}, {{ expenseGroupService.getRestSum(expenseGroupBudget).toLocaleString('de-DE') }} € {{ $t('left') }}.</p>
        </main>
    </div>
</template>

<style scoped>
.container {
    background-color: var(--light-blue);
    border-radius: 3.3rem;
    width: 100%;
    padding: 2.4rem;
    margin-bottom: 1.2rem;
}

.header {
    display: flex;
    justify-content: space-between;
}

.title {
    display: flex;
}

h3 {
    margin: auto 0.6rem;
}

hr {
    margin: 2.4rem 0;
}

.color {
    background-color: v-bind(props.expenseGroup.color);
    height: 2.4rem;
    width: 1.2rem;
    margin: auto 0;
}
</style>