<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '@/services/AuthService';
import CookieService from '@/services/CookieService';

const router = useRouter();

const emailInput = ref<string>();
const passwordInput = ref<string>();

const isButtonDisabled = computed((): boolean => {
    const regex = new RegExp('^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$');
    if (emailInput.value && passwordInput.value && passwordInput.value.length > 0) {
        return !regex.test(emailInput.value);
    }
    return true;
})



function handleConfirm() {
    const authService = new AuthService();
    if (emailInput.value && passwordInput.value) {
        authService.Login(emailInput.value, passwordInput.value).then((isLoginSuccess: boolean) => {
            if (isLoginSuccess) {
                router.push({
                    name: 'home'
                });
            }
        });
    }
}

onMounted(() => {
    const cookieService = new CookieService();
    if (cookieService.lastLogin) {
        emailInput.value = cookieService.lastLogin;
    }
});

</script>

<template>
    <div class="login-container">
        <div class="login-form">
            <div class="form-container">
                <img class="logo" src="src/assets/Logo_vector.svg" alt="Budget handler Logo">
                <p>{{ $t('Login with your BUDGEThandler account.') }}</p>
                <div class="input-border">
                    <img class="input-icon" src="src/assets/icons/mail-icon.svg" alt="mail-icon">
                    <input class="form-input" type="email" v-model="emailInput">
                </div>
                <div class="input-border">
                    <img class="input-icon" src="src/assets/icons/lock-icon.svg" alt="lock-icon">
                    <input class="form-input" type="password" v-model="passwordInput">
                </div>
            </div>
        </div>
        <button class="on-bottom" @click="handleConfirm()" :disabled="isButtonDisabled">{{ $t('next') }}</button>
    </div>
</template>

<style scoped>
.on-bottom {
    margin: auto;
    top: -2.8rem;
}
</style>