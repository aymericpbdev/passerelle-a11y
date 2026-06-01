<!-- src/views/ProjectDetailView.vue -->
<template>
  <AppLayout>
    <RouterLink
      to="/dashboard"
      class="text-sm text-primary-600 hover:text-primary-700 mb-6 inline-block"
    >
      &larr; Retour aux projets
    </RouterLink>

    <div v-if="isLoading" class="bg-white rounded-lg border border-gray-200 p-8 text-center">
      <p class="text-gray-600">Chargement du projet...</p>
    </div>

    <div v-else-if="errorMessage" class="bg-red-50 rounded-lg border border-red-200 p-8 text-center">
      <p class="text-red-800 font-medium mb-2">Une erreur est survenue.</p>
      <p class="text-red-700">{{ errorMessage }}</p>
    </div>

    <div v-else-if="project">
      <section class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ project.name }}</h1>
        <p class="text-gray-600 break-words mb-6">{{ project.url }}</p>

        <button
          type="button"
          @click="runAudit"
          :disabled="isAuditing"
          class="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isAuditing ? 'Audit en cours...' : 'Lancer un audit' }}
        </button>
      </section>

      <!-- Message d'attente pendant l'audit -->
      <div
        v-if="isAuditing"
        class="bg-white rounded-lg border border-gray-200 p-6 text-center"
      >
        <p class="text-gray-600">
          Analyse de l'accessibilité en cours, cela peut prendre quelques secondes...
        </p>
      </div>

      <!-- Erreur d'audit -->
      <div
        v-else-if="auditError"
        class="bg-red-50 rounded-lg border border-red-200 p-6"
      >
        <p class="text-red-800 font-medium mb-1">L'audit a échoué.</p>
        <p class="text-red-700">{{ auditError }}</p>
      </div>

      <!-- Confirmation brute du resultat, mise en forme a la sous-tache suivante -->
      <div
        v-else-if="audit"
        class="bg-white rounded-lg border border-gray-200 p-6"
      >
        <p class="text-gray-900 font-medium">Audit terminé. Score : {{ audit.score }} sur 100.</p>
        <p class="text-gray-600">{{ audit.issues.length }} violation(s) détectée(s).</p>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import { api } from '@/services/api'
import type { Project, Audit } from '@/types/models'
import type { ApiError } from '@/services/api'
import AppLayout from '@/components/layout/AppLayout.vue'

const route = useRoute()

/* Etat reactif du projet et du cycle de chargement. */
const project = ref<Project | null>(null)
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

/* Etat reactif de l'audit. */
const isAuditing = ref(false)
const auditError = ref<string | null>(null)
const audit = ref<Audit | null>(null)

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

/* Lance un audit sur le projet courant. L'analyse prend quelques secondes cote serveur, l'etat isAuditing permet d'afficher l'attente et de bloquer le bouton. */
async function runAudit() {
  isAuditing.value = true
  auditError.value = null
  audit.value = null

  try {
    const id = route.params.id
    audit.value = await api.post<Audit>(`/api/projects/${id}/audits`)
  } catch (error) {
    const apiError = error as ApiError
    auditError.value = apiError.errors[0]?.message ?? "L'audit a échoué."
  } finally {
    isAuditing.value = false
  }
}

/* Au montage, on charge le projet. */
onMounted(() => {
  loadProject()
})
</script>