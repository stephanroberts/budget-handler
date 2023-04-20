<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <div class="container">
        <div class="nav-bar">
            <div class="icon-btn">
                <img src="@/assets/icons/list-icon-selected.svg" alt="list-icon" v-if="route.name === 'expenseGroupList'">
                <img src="@/assets/icons/list-icon.svg" alt="list-icon" v-else>
            </div>
            <div class="icon-btn">
                <img src="@/assets/icons/pie-chart-icon.svg" alt="pie-chart-icon">
            </div>
            <div class="icon-btn">
                <img src="@/assets/icons/plus-icon.svg" alt="plus-icon">
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container {
        position: fixed;
        bottom: 0;
        z-index: 1;
        width: 100%;
        display: flex;
        justify-content: center;
        max-width: 80rem;
    }
    .nav-bar {
        border-radius: 6.6rem;
        background-color: var(--purple-white);
        display: flex;
        margin-bottom: 2.4rem;
        box-shadow: 0rem 0.2rem 0.4rem rgba(0, 0, 0, 0.33);
    }
    .icon-btn {
        margin: 0.3rem 2.4rem;
    }

</style>