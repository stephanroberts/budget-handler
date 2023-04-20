<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ExpenseGroupService from '@/services/ExpenseGroupService'
import type { IExpenseGroup } from '@/interfaces/IExpenseGroup';


const props = defineProps<{
    budgetSum: number;
    expenseGroup: IExpenseGroup;
}>();

const expenseGroupBudget = ref<number>(0);
const percentConsumedFromGroupBudget = ref<number>(0);

onMounted(() => {
    const expenseGroupService = new ExpenseGroupService(props.expenseGroup);
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
            <hr>
            <p>{{ $t('Sum') }} 40 000 €</p>
            <p class="caption"> {{ percentConsumedFromGroupBudget.toLocaleString('de-DE', { maximumFractionDigits: 0}) }} {{ $t('of') }} {{ expenseGroup.percent }}% {{ $t('consumed') }}, 110 000 € {{ $t('left') }}.</p>
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

.color {
    background-color: v-bind(props.expenseGroup.color);
    height: 2.4rem;
    width: 1.2rem;
    margin: auto 0;
}
</style>