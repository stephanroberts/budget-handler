<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router'
import { useOverlayStore } from './stores/overlay';
import HeaderUserButtonComponent from './components/HeaderUserButtonComponent.vue';
import HeaderExpenseGroupComponent from './components/HeaderExpenseGroupComponent.vue';
import BottomNavBarComponent from './components/BottomNavBarComponent.vue';
import EditOverlayComponent from './components/EditOverlayComponent.vue';

const route = useRoute();
const overlayStore = useOverlayStore();

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
  <Transition name="slide-fade">
    <div v-if="overlayStore.isOverlayOpen" id="edit-overlay-bg">
      <div id="edit-overlay">
        <EditOverlayComponent></EditOverlayComponent>
      </div>
    </div>
  </Transition>
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

.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(2rem);
  opacity: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
