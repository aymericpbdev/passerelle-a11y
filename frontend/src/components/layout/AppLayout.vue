<!-- src/components/AppLayout.vue -->

<template>
    <div class="min-h-screen bg-gray-50">
        
        <!-- En-tête de l'app -->
        <AppHeader />

        <!-- Zone principale de contenu
        "pb-20 md:pb-6" = padding bas compensé par la hauteur de la navigation mobile
        Sur mobile la nav fixe en bas masque le bas de page sans le padding
        Sur desktop la nav mobile est cachée et le padding est réduit -->
        <main class="max-w-7xl mx-auto px-4 py-6 pb-20 md:pb-6">
            <!-- slot = emplacement d'injection du contenu spécifique de chaque page -->
            <slot />
        </main>

        <!-- Navigation basse mobile -->
        <AppNavMobile />

    </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppNavMobile from './AppNavMobile.vue'
</script>
