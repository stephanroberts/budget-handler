<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CookieService from '@/services/CookieService';

const currentUser = ref<string>('');

onMounted(() => {
    const cookieService = new CookieService();
    let lastLogin: string = cookieService.lastLogin;
    const bodyWidth: number = document.body.scrollWidth;
    if (lastLogin.length > 12 && bodyWidth < 500) {
        lastLogin = `${lastLogin.slice(0, 11)}...`;
    }
    currentUser.value = lastLogin;
})
</script>

<template>
    <div class="container">
        <div class="user-btn">
            <img src="@/assets/icons/user-icon.svg" alt="user-icon">
            <div class="user-btn-text">{{ currentUser }}</div>
            <img src="@/assets/icons/chevron-down-icon.svg" alt="chevron-down-icon">
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    display: flex;
    justify-content: end;
}

.user-btn {
    background-color: var(--action-purple);
    color: var(--purple-white);
    border-radius: 6.6rem;
    padding: 1.2rem 2.4rem;
    display: flex;
    margin: 2.4rem;
    box-shadow: 0rem 0.2rem 0.4rem rgba(0, 0, 0, 0.33);
}

.user-btn-text {
    font-style: normal;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 1.92rem;
    margin: auto 0.6rem;
}
</style>
