<script setup lang="ts">
import { ref } from 'vue';

const nameInput = ref<string>('');
const budgetInput = ref<number>();
const newPartnerInput = ref<string>('');
const sharingPartners = ref<string[]>([])

function addNewSharingPartner() {
    sharingPartners.value.push(newPartnerInput.value);
    newPartnerInput.value = '';
}
</script>

<template>
    <div class="container">
        <div class="headline">
            <h1>New budget project</h1>
            <div class="icon-btn">
                <img src="@/assets/icons/close-icon.svg" alt="close-icon">
            </div>
        </div>
        <div class="input-border">
            <img class="input-icon" src="src/assets/icons/terminal-icon.svg" alt="terminal-icon">
            <input class="form-input" type="text" v-model="nameInput" placeholder="Budget Projekt Name">
        </div>
        <div class="input-border">
            <img class="input-icon" src="src/assets/icons/dollar-icon.svg" alt="dollar-icon">
            <input class="form-input" type="number" v-model="budgetInput" placeholder="Budget Summe in Euro">
        </div>
        <div class="sharing-list">
            <h3>{{ $t('Sharing partner per email') }}</h3>
            <p v-for="sharingPartner in sharingPartners">{{sharingPartner}}</p>
            <div class="new-partner-row">
                <div class="input-border">
                    <img class="input-icon" src="src/assets/icons/mail-icon.svg" alt="mail-icon">
                    <input class="form-input" type="email" v-model="newPartnerInput" placeholder="neuer Partner">
                </div>
                <div class="icon-btn" @click="addNewSharingPartner()"><img src="@/assets/icons/plus-icon.svg" alt="plus-icon"></div>
            </div>
        </div>
        <button>{{ $t('save') }}</button>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    position: fixed;
    background-color: var(--purple-white);
    border-radius: 6.6rem 6.6rem 0 0;
    width: 100%;
    max-width: 80rem;
    height: 90vh;
    bottom: 0;
    padding: 2.4rem;
}

h1 {
    margin: auto 0;
}

p {
    margin: 1.2rem 0;
}

button {
    margin-top: 4.8rem;
}

.headline {
    display: flex;
    justify-content: space-between;
}

.sharing-list {
    text-align: left;
}

h3 {
    margin: 4.8rem 0 0.6rem 0;
}

.new-partner-row{
    display: flex;
}

.icon-btn {
    margin: auto 0;
}
</style>