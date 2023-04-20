<script setup lang="ts">
import type { IExpenses } from '@/interfaces/IExpenses';

const props = defineProps<{
    expenseItem: IExpenses
}>();

</script>

<template>
    <div class="container">
        <div class="header">
            <p>{{ expenseItem.title }}</p>
            <div class="icon-btn">
                <img src="@/assets/icons/edit-icon.svg" alt="edit-icon">
            </div>
        </div>
        <div class="information">
            <p class="caption date">{{ expenseItem.date }}</p>
            <p class="caption">{{ expenseItem.expense.toLocaleString('de-DE') }} €</p>
        </div>
    </div>
</template>

<style scoped>
    .container {
        padding: 0 !important;
        width: 100%;
        margin: 2.4rem 0;
    }

    .icon-btn {
        padding: 0 1.2rem 0 0;
    }
    .header {
        display: flex;
        justify-content: space-between;
    }
    .information {
        display: flex;
    }

    .date {
        margin-right: 1.2rem;
    }
</style>