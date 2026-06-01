<!-- src/views/ProjectDetailView.vue -->
<template>
  <AppLayout>
    <RouterLink
      to="/dashboard"
      class="text-sm text-primary-600 hover:text-primary-700 mb-6 inline-block"
    >
      Retour aux projets
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

      <div v-if="isAuditing" class="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <p class="text-gray-600">
          Analyse de l'accessibilité en cours, cela peut prendre quelques secondes...
        </p>
      </div>

      <div v-else-if="auditError" class="bg-red-50 rounded-lg border border-red-200 p-6">
        <p class="text-red-800 font-medium mb-1">L'audit a échoué.</p>
        <p class="text-red-700">{{ auditError }}</p>
      </div>

      <div v-else-if="audit" class="space-y-6">
        <section class="bg-white rounded-lg border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-2">Score d'accessibilité</h2>
          <p class="text-4xl font-bold" :class="scoreColorClass">{{ audit.score }} / 100</p>
          <p class="text-gray-600 mt-2">
            {{ audit.issues.length }} violation(s) détectée(s) sur la page analysée.
          </p>
        </section>

        <section
          v-if="audit.issues.length === 0"
          class="bg-success-100 rounded-lg border border-success-600 p-6"
        >
          <p class="text-success-600 font-medium">
            Aucune violation détectée. La page respecte les règles testées.
          </p>
        </section>

        <section
          v-for="group in groupedIssues"
          :key="group.severity"
          class="bg-white rounded-lg border border-gray-200 p-6"
        >
          <h3 class="text-base font-semibold mb-4" :class="group.titleClass">
            {{ group.label }} ({{ group.issues.length }})
          </h3>

          <ul class="space-y-4">
            <li
              v-for="issue in group.issues"
              :key="issue.id"
              class="border-l-4 pl-4"
              :class="group.borderClass"
            >
              <p class="font-medium text-gray-900 mb-1">{{ issue.description }}</p>
              <pre class="bg-gray-100 text-gray-800 text-sm rounded p-2 my-2 overflow-x-auto">{{ issue.element }}</pre>
              <a
                v-if="issue.recommendation"
                :href="issue.recommendation"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-primary-600 hover:text-primary-700 underline focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                Comment corriger ce problème
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
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

/* Couleur du score selon trois seuils. Utilise les couleurs de statut definies dans le theme, dont le contraste est verifie. Seuils par defaut, affinables. */
const scoreColorClass = computed(() => {
  const score = audit.value?.score ?? 0
  if (score >= 80) {
    return 'text-success-600'
  }
  if (score >= 50) {
    return 'text-warning-600'
  }
  return 'text-danger-600'
})

/* Ordre des gravites de la plus grave a la moins grave, avec leur libelle francais et les classes de couleur associees. critical et serious utilisent les couleurs de statut, moderate et minor restent neutres. */
const severityConfig = [
  { severity: 'critical', label: 'Critiques', titleClass: 'text-danger-600', borderClass: 'border-danger-600' },
  { severity: 'serious', label: 'Sérieuses', titleClass: 'text-warning-600', borderClass: 'border-warning-600' },
  { severity: 'moderate', label: 'Modérées', titleClass: 'text-gray-700', borderClass: 'border-gray-400' },
  { severity: 'minor', label: 'Mineures', titleClass: 'text-gray-700', borderClass: 'border-gray-400' },
]

/* Regroupe les issues de l'audit par gravite, dans l'ordre defini. Ne garde que les groupes qui contiennent au moins une issue. */
const groupedIssues = computed(() => {
  const issues = audit.value?.issues ?? []

  return severityConfig
    .map((config) => ({
      ...config,
      issues: issues.filter((issue) => issue.severity === config.severity),
    }))
    .filter((group) => group.issues.length > 0)
})

/* Au montage, on charge le projet. */
onMounted(() => {
  loadProject()
})
</script>