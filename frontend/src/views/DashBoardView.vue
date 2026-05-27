<!-- src/views/DashBoardView.vue -->
<template>
  <AppLayout>
    <section class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Bonjour {{ authStore.displayName }}</h1>
      <p class="text-gray-600">Bienvenue sur ton espace Passerelle A11y.</p>
    </section>

    <section>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-gray-900">Mes projets</h2>
        <button
          type="button"
          class="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Nouveau projet
        </button>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p class="text-gray-700 mb-2 font-medium">Tu n'as pas encore créé de projet.</p>
        <p class="text-gray-600 mb-6 max-w-md mx-auto">
          Un projet te permet de regrouper plusieurs audits dans le temps pour un même site web, et
          de suivre l'évolution de son accessibilité.
        </p>
        <button
          type="button"
          class="bg-primary-600 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Créer mon premier projet
        </button>
      </div>
    </section>
  </AppLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import AppLayout from '@/components/layout/AppLayout.vue'

const authStore = useAuthStore()
</script>
