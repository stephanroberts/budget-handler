<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BudgetProjectService from '@/services/BudgetProjectService';
import type { IBudgetProject } from '@/interfaces/IBudgetProject';
import BudgetProjectItemComponent from '@/components/BudgetProjectItemComponent.vue';

const budgetProjects = ref<IBudgetProject[]>([]);

onMounted(async ()=> {
  const budgetProjectService = new BudgetProjectService();
  await budgetProjectService.getBudgetProject().then((budgetProjectsResponse: IBudgetProject[]) => {
    budgetProjects.value = budgetProjectsResponse;
  })
})

</script>

<template>
  <div class="content-container">
    <main class="card">
      <BudgetProjectItemComponent  v-for="budgetProject in budgetProjects" :budget-project="budgetProject"></BudgetProjectItemComponent>  
    </main>
    <div class="bottom-btn-container">
      <button>{{ $t('new budget project') }}</button>
    </div>
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
  bottom: 5.7rem;
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

.bottom-btn-container {
  position: fixed;
  bottom: 2.7rem;
  width: 100%;
}</style>
