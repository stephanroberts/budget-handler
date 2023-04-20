<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BudgetProjectService from '@/services/BudgetProjectService';
import type { IBudgetProject } from '@/interfaces/IBudgetProject';

const router = useRouter();

const props = defineProps<{
    budgetProject: IBudgetProject,
}>();

const consumedInPercent = ref<number>(0);

function handleClickedOnBudgetProject() {
    router.push({
        name: 'expenseGroupList',
        params: {
            id: props.budgetProject.id,
        }
    });
}

onMounted(() => {
    const budgetProjectService = new BudgetProjectService()
    consumedInPercent.value = budgetProjectService.getConsumedBudgetInPercent(props.budgetProject);
})

</script>

<template>
    <div class="container" @click="handleClickedOnBudgetProject()">
        <div class="headline">
            <h3 class="name">{{ props.budgetProject.title }}</h3>
            <div class="icon-btn">
                <img src="@/assets/icons/edit-icon.svg" alt="edit-icon">
            </div>
        </div>
        <div class="informations">
            <p class="sum">{{ props.budgetProject.budget }} €</p>
            <p class="caption">{{ consumedInPercent }} % {{ $t('consumed') }}</p>
        </div>
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

.headline {
    display: flex;
    justify-content: space-between;
}

.name {
    margin-top: 1.6rem;
} 

.informations {
    display: flex;
    margin-bottom: 1.4rem;
}

.sum {
    margin-right: 1.2rem;
}

.caption {
    bottom: -0.4rem
}
</style>
