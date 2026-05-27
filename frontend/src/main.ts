import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

/*
Restauration de l'état d'authentification depuis le localStorage.
La restauration depuis l'URL (cas redirection post-login depuis le backend) est gérée par le router via un beforeEach guard.
*/
const authStore = useAuthStore()
authStore.restoreFromStorage()

app.mount('#app')
