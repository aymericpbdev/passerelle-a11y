<!-- src/components/layout/AppHeader.vue -->
<template>
  <header class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/dashboard" class="font-bold text-lg text-primary-600">
        Passerelle A11y
      </RouterLink>

      <!-- Navigation principale : visible à partir de md, cachée sur mobile -->
      <nav aria-label="Navigation principale" class="hidden md:flex items-center gap-6">
        <RouterLink
          to="/dashboard"
          class="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
        >
          Tableau de bord
        </RouterLink>
      </nav>

      <!-- Menu utilisateur : nom complet visible desktop, bouton déconnexion partout -->
      <div class="flex items-center gap-3">
        <span class="text-sm text-gray-700 hidden md:inline" aria-label="Utilisateur connecté">
          {{ authStore.displayName }}
        </span>
        <button
          type="button"
          @click="handleLogout"
          class="text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-3 py-1.5"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

/*
Déconnecte l'utilisateur côté store, puis redirige vers la landing publique du backend. La redirection sort de la SPA Vue, on utilise window.location.href plutôt que router.push.
*/
async function handleLogout(): Promise<void> {
  await authStore.logout()
  window.location.href = 'http://localhost:3333/'
}
</script>
