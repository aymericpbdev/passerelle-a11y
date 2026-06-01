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

      <!-- Etat de chargement -->
      <div v-if="isLoading" class="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p class="text-gray-600">Chargement de tes projets...</p>
      </div>

      <!-- Etat d'erreur -->
      <div
        v-else-if="errorMessage"
        class="bg-red-50 rounded-lg border border-red-200 p-8 text-center"
      >
        <p class="text-red-800 font-medium mb-2">Une erreur est survenue.</p>
        <p class="text-red-700">{{ errorMessage }}</p>
      </div>

      <!-- Etat vide -->
      <div
        v-else-if="projects.length === 0"
        class="bg-white rounded-lg border border-gray-200 p-8 text-center"
      >
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

      <!-- Liste des projets -->
      <ul v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="project in projects"
          :key="project.id"
          class="bg-white rounded-lg border border-gray-200 p-5 hover:border-primary-400 transition-colors"
        >
          <h3 class="font-semibold text-gray-900 mb-1">{{ project.name }}</h3>
          <p class="text-sm text-gray-600 break-words">{{ project.url }}</p>
        </li>
      </ul>
    </section>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/services/api'
import type { Project } from '@/types/models'
import type { ApiError } from '@/services/api'
import AppLayout from '@/components/layout/AppLayout.vue'

const authStore = useAuthStore()

/* Etat reactif de la liste des projets et du cycle de chargement. */
const projects = ref<Project[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

/* Charge les projets de l'utilisateur depuis l'API. Gere les trois etats : chargement, succes, erreur. */
async function loadProjects() {
  isLoading.value = true
  errorMessage.value = null

  try {
    projects.value = await api.get<Project[]>('/api/projects')
  } catch (error) {
    const apiError = error as ApiError
    errorMessage.value = apiError.errors[0]?.message ?? 'Impossible de charger les projets.'
  } finally {
    isLoading.value = false
  }
}

/* Au montage de la page, on declenche le chargement des projets. */
onMounted(() => {
  loadProjects()
})
</script>