import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/services/api'

/*
Type représentant un utilisateur authentifié.
Reflète la structure renvoyée par l'API backend dans data.user.
*/
export type AuthUser = {
  id: number
  fullName: string
  email: string
}

const STORAGE_KEY_TOKEN = 'auth_token'
const STORAGE_KEY_USER = 'auth_user'

export const useAuthStore = defineStore('auth', () => {
  /*
  État réactif du store.
  Initialisé à null, sera peuplé par restoreFromUrl ou restoreFromStorage.
  */
  const token = ref<string | null>(null)
  const user = ref<AuthUser | null>(null)

  /*
  Getter dérivé. True si un token est présent en state.
  Utilisé par le router guard et les composants conditionnels.
  */
  const isAuthenticated = computed(() => token.value !== null)

  /*
Nom à afficher pour l'utilisateur connecté.
Format "Prénom I." avec l'initiale du dernier mot.
Gestion des cas particuliers : nom vide, un seul mot, plusieurs mots.
Centralisé ici pour servir de single source of truth aux composants qui affichent l'identité de l'utilisateur.
*/
  const displayName = computed(() => {
    const fullName = user.value?.fullName ?? ''
    const parts = fullName.trim().split(/\s+/).filter(Boolean)

    if (parts.length === 0) {
      return ''
    }
    if (parts.length === 1) {
      return parts[0] ?? ''
    }
    const firstName = parts[0] ?? ''
    const lastPart = parts.at(-1) ?? ''
    const lastInitial = lastPart.charAt(0).toUpperCase()
    return `${firstName} ${lastInitial}.`
  })

  /*
  Persiste l'état actuel dans localStorage.
  Appelé après chaque modification du state pour garder la persistance synchrone.
  */
  function persist() {
    if (token.value && user.value) {
      localStorage.setItem(STORAGE_KEY_TOKEN, token.value)
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user.value))
    } else {
      localStorage.removeItem(STORAGE_KEY_TOKEN)
      localStorage.removeItem(STORAGE_KEY_USER)
    }
  }

  /*
  Lit les paramètres du hash de l'URL, peuple le state si présents, puis nettoie le hash pour ne pas laisser le token dans l'URL.
  À appeler au montage du composant Dashboard.
  Retourne true si l'authentification a été restaurée depuis l'URL.
  */
  function restoreFromUrl(): boolean {
    const hash = window.location.hash
    if (!hash || !hash.startsWith('#')) {
      return false
    }

    const params = new URLSearchParams(hash.slice(1))
    const urlToken = params.get('token')
    const urlId = params.get('id')
    const urlFullName = params.get('fullName')
    const urlEmail = params.get('email')

    if (!urlToken || !urlId || !urlFullName || !urlEmail) {
      return false
    }

    token.value = urlToken
    user.value = {
      id: Number(urlId),
      fullName: urlFullName,
      email: urlEmail,
    }
    persist()

    return true
  }

  /*
  Restaure l'état depuis localStorage au démarrage de l'application.
  Appelé une seule fois, au bootstrap de l'app.
  */
  function restoreFromStorage(): boolean {
    const storedToken = localStorage.getItem(STORAGE_KEY_TOKEN)
    const storedUser = localStorage.getItem(STORAGE_KEY_USER)

    if (!storedToken || !storedUser) {
      return false
    }

    try {
      token.value = storedToken
      user.value = JSON.parse(storedUser) as AuthUser
      return true
    } catch {
      /*
      Si le JSON est corrompu, on nettoie tout plutôt que de laisser un état incohérent.
      */
      token.value = null
      user.value = null
      persist()
      return false
    }
  }

  /*
  Déconnecte l'utilisateur. Appelle l'API pour invalider le token côté serveur, puis vide le state et le localStorage quelle que soit la réponse de l'API. La déconnexion locale doit toujours réussir, même si l'API est inaccessible.
  */
  async function logout(): Promise<void> {
    try {
      await api.delete('/api/auth/logout')
    } catch {
      /*
      On ignore les erreurs de l'API. La priorité est de déconnecter l'utilisateur localement. Le token côté serveur expirera de lui-même s'il n'est pas invalidé.
      */
    }

    token.value = null
    user.value = null
    persist()
  }

  return {
    token,
    user,
    isAuthenticated,
    displayName,
    restoreFromUrl,
    restoreFromStorage,
    logout,
  }
})
