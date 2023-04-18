<script setup lang="ts">
import { ref } from 'vue';

const emailInput = ref<string>();
const passwordInput = ref<string>();

function handleSubmit() {
    console.log(emailInput.value);
    console.log(passwordInput.value);
}

</script>

<template>
    <div class="login-container vertical-container">
        <div class="login-form">
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
        <input class="on-bottom button clear-flex" type="submit" value="next">
    </div>
</template>

<style></style>