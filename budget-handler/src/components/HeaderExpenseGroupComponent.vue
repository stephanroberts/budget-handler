<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BudgetProjectService from '@/services/BudgetProjectService';
import { useBudgetProjectStore } from '@/stores/budgetProject'

const router = useRouter();
const budgetProjectStore = useBudgetProjectStore();

const budgetConsumedInPercent = ref<number>(0);

function handleBackArrowClick() {
    router.push({
        name: 'home',
    })
}

onMounted(() => {
    const budgetProjectService = new BudgetProjectService();
    const budgetProject = budgetProjectStore.budgetProject;
    if (budgetProject) {
        budgetConsumedInPercent.value = budgetProjectService.getConsumedBudgetInPercent(budgetProject);
    }
})

</script>

<template>
    <div class="container">
        <div class="header">
            <div class="icon-btn" @click="handleBackArrowClick()">
                <img src="@/assets/icons//arrow-left-icon.svg" alt="arrow-left-icon">
            </div>
            <div class="headline">
                <h1>{{ budgetProjectStore.budgetProject?.title }}</h1>
                <div class="information">
                    <p>{{ budgetProjectStore.budgetProject?.budget }} €</p>
                    <p class="caption"> {{ budgetConsumedInPercent }}% {{ $t('consumed')}} </p>
                </div>
            </div>
            <div class="icon-btn">
                <img src="@/assets/icons/edit-icon.svg" alt="edit-icon">
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    padding: 2.4rem;
}
.header {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.headline {
    width: 100%;
    text-align: center;
}
.information {
    margin-top: 0.6rem;
    width: 100%;
    display: flex;
    justify-content: center;
}

.caption {
    margin-left: 1.2rem;
    margin-top: auto;
}

</style>