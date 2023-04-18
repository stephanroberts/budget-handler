import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import messages from './locale/indexMessage'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const i18n = createI18n({
    locale: 'de', 
    fallbackLocale: 'de',
    messages,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
