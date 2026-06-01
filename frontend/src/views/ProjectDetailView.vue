<!-- src/views/ProjectDetailView.vue -->
<template>
  <AppLayout>
    <!-- Lien de retour vers le dashboard -->
    <RouterLink
      to="/dashboard"
      class="text-sm text-primary-600 hover:text-primary-700 mb-6 inline-block"
    >
      &larr; Retour aux projets
    </RouterLink>

    <!-- Etat de chargement -->
    <div v-if="isLoading" class="bg-white rounded-lg border border-gray-200 p-8 text-center">
      <p class="text-gray-600">Chargement du projet...</p>
    </div>

    <!-- Etat d'erreur -->
    <div v-else-if="errorMessage" class="bg-red-50 rounded-lg border border-red-200 p-8 text-center">
      <p class="text-red-800 font-medium mb-2">Une erreur est survenue.</p>
      <p class="text-red-700">{{ errorMessage }}</p>
    </div>

    <!-- Detail du projet -->
    <div v-else-if="project">
      <section class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ project.name }}</h1>
        <p class="text-gray-600 break-words">{{ project.url }}</p>
      </section>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import { api } from '@/services/api'
import type { Project } from '@/types/models'
import type { ApiError } from '@/services/api'
import AppLayout from '@/components/layout/AppLayout.vue'

/* Acces aux parametres de la route courante. route.params.id contient le segment dynamique de l'URL /projects/:id. */
const route = useRoute()

/* Etat reactif du projet et du cycle de chargement. */
const project = ref<Project | null>(null)
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

/* Charge le projet depuis l'API a partir de l'id present dans l'URL. */
async function loadProject() {
  isLoading.value = true
  errorMessage.value = null

  try {
    const id = route.params.id
    project.value = await api.get<Project>(`/api/projects/${id}`)
  } catch (error) {
    const apiError = error as ApiError
    errorMessage.value = apiError.errors[0]?.message ?? 'Impossible de charger le projet.'
  } finally {
    isLoading.value = false
  }
}

/* Au montage, on charge le projet. */
onMounted(() => {
  loadProject()
})
</script>