<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import BudgetProjectService from '@/services/BudgetProjectService';
import CookieService from '@/services/CookieService';
import { useOverlayStore } from '@/stores/overlay';
import { useBudgetProjectStore } from '@/stores/budgetProject';
import type { IBudgetProject } from '@/interfaces/IBudgetProject';

const overlayStore = useOverlayStore();
const budgetProjectStore = useBudgetProjectStore();

const nameInput = ref<string>('');
const budgetInput = ref<number>();
const newPartnerInput = ref<string>('');
const sharingPartners = ref<string[]>([])

const isSaveButtonDisabled = computed((): boolean => {
    if (nameInput.value && budgetInput.value) {
        return false;
    }
    return true;
})

function handleCloseOverlay() {
    overlayStore.budgetProjectToEdit = undefined;
    overlayStore.isOverlayOpen = false
}

function removeSharingPartner(index: number) {
    sharingPartners.value.splice(index, 1);
}

function addNewSharingPartner() {
    if (!newPartnerInput.value) {
        return;
    }
    sharingPartners.value.push(newPartnerInput.value);
    newPartnerInput.value = '';
}

async function saveBudgetProject() {
    if (overlayStore.budgetProjectToEdit) {
        updateBudgetProject();
        return;
    }
    if (!nameInput.value || !budgetInput.value) {
        return;
    }
    const budgetProjectService = new BudgetProjectService();
    await budgetProjectService.saveNewBudgetBroject(nameInput.value, budgetInput.value, sharingPartners.value).then((response: IBudgetProject) => {
        console.log('New Budget Project: ', response);
        budgetProjectStore.storeBudgetProjectsFromApiInStore();
        overlayStore.isOverlayOpen = false;
    })
}

async function updateBudgetProject() {
    if (!nameInput.value || !budgetInput.value || !overlayStore.budgetProjectToEdit) {
        return;
    }
    const budgetProjectService = new BudgetProjectService();
    await budgetProjectService.updateBudgetProject(overlayStore.budgetProjectToEdit, nameInput.value, budgetInput.value, sharingPartners.value).then((response: IBudgetProject) => {
        console.log('Updated budget project: ', response);
        budgetProjectStore.storeBudgetProjectsFromApiInStore();
        overlayStore.isOverlayOpen = false;
    });
}

async function deleteBudgetProject() {
    if (!overlayStore.budgetProjectToEdit) {
        return;
    }
    const budgetProjectService = new BudgetProjectService();
    await budgetProjectService.deleteBudgetProject(overlayStore.budgetProjectToEdit.id).then((response : IBudgetProject) => {
        console.log('budget project deleted: ', response);
    });
    budgetProjectStore.storeBudgetProjectsFromApiInStore();
    overlayStore.budgetProjectToEdit = undefined;
    overlayStore.isOverlayOpen = false;
}

onMounted(() => {
    if (overlayStore.budgetProjectToEdit) {
        const cookieService = new CookieService();
        nameInput.value = overlayStore.budgetProjectToEdit.title;
        budgetInput.value = overlayStore.budgetProjectToEdit.budget;
        sharingPartners.value = overlayStore.budgetProjectToEdit.sharedWith;
        const currentUserIndex = sharingPartners.value.indexOf(cookieService.lastLogin);
        sharingPartners.value.splice(currentUserIndex, 1);
    }
});
</script>

<template>
    <div class="container">
        <div class="headline">
            <h1 v-if="!overlayStore.budgetProjectToEdit">{{ $t('new budget project') }}</h1>
            <h1 v-else>{{ $t('edit budget project') }}</h1>
            <div class="icon-btn" @click="handleCloseOverlay()">
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
            <div class="sharing-partners" v-for="(sharingPartner, index) in sharingPartners">
                <p >{{sharingPartner}}</p>
                <img src="@/assets/icons/trash-icon.svg" alt="trash-icon" @click="removeSharingPartner(index)">
            </div>
            <div class="new-partner-row">
                <div class="input-border">
                    <img class="input-icon" src="src/assets/icons/mail-icon.svg" alt="mail-icon">
                    <input class="form-input" type="email" v-model="newPartnerInput" placeholder="neuer Partner">
                </div>
                <div class="icon-btn" @click="addNewSharingPartner()"><img src="@/assets/icons/plus-icon.svg" alt="plus-icon"></div>
            </div>
        </div>
        <button :disabled="isSaveButtonDisabled" @click="saveBudgetProject()">{{ $t('save') }}</button>
        <button class="delete" v-if="overlayStore.budgetProjectToEdit" @click="deleteBudgetProject()">{{ $t('delete') }}</button>
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

.delete {
    background-color: var(--attention-red);
}

.headline {
    display: flex;
    justify-content: space-between;
}

.sharing-list {
    text-align: left;
}

.sharing-partners {
    display: flex;
    justify-content: space-between;
}

h3 {
    margin: 4.8rem 0 2.4rem 0;
}

.new-partner-row{
    display: flex;
}

.icon-btn {
    margin: auto 0;
}

@media screen and (min-width: 430px){
    .delete {
        margin-left: 2.4rem;
    }
}
</style>