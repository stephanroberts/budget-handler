<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router'
import HeaderUserButtonComponent from './components/HeaderUserButtonComponent.vue';
import HeaderExpenseGroupComponent from './components/HeaderExpenseGroupComponent.vue';
import BottomNavBarComponent from './components/BottomNavBarComponent.vue';
import EditOverlayComponent from './components/EditOverlayComponent.vue';

const route = useRoute();

const showHeader = computed((): boolean => {
  let show = true;
  if (route.name === 'login') {
    show = false;
  }
  return show;
});

const showBottomNavBar = computed((): boolean => {
  let show = true;
  if (route.name !== 'expenseGroupList') {
    show = false;
  }
  if (route.name === 'login') {
    show = false;
  }
  return show;
})

</script>

<template>
  <header v-if="showHeader">
    <HeaderUserButtonComponent v-if="route.name === 'home'"></HeaderUserButtonComponent>
    <HeaderExpenseGroupComponent v-else></HeaderExpenseGroupComponent>
  </header>

  <RouterView />

  <BottomNavBarComponent v-if="showBottomNavBar"></BottomNavBarComponent>
  <div id="dark-background"></div>
  <div id="edit-overlay-bg">
    <div id="edit-overlay">
      <EditOverlayComponent></EditOverlayComponent>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

#edit-overlay-bg {
  z-index: 5;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.33);
}

#edit-overlay {
  display: flex;
  justify-content: center;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
