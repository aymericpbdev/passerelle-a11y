<!-- src/components/layout/AppNavMobile.vue -->

<template>
    <!-- Navigation mobile : 
     "fixed bottom-0" = collée en bas de l'écran, fixe et ne suit pas le scroll
     "md:hidden" = cachée à partie de 768px car la nav header prend le relais
     "z-10" = au-dessus du content de la page -->
     <nav aria-label="Navigation mobile" class="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 z-10">
        <ul class="flex" role="list">
            <li class="flex-1">
                <RouterLink
                to="/dashboard"
                class="flex flex-col items-center gap-1 py-3 text-xs text-gray-500 hover:text-primary-600 transition-colors"
                aria-current-value="page"
                aria-label="Tableau de bord"
                >
                    <!-- Icone SVG Home -->
                    <!-- aria-hidden="true" : icone décorative, aria-label suffisant -->
                    <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                    </svg>
                    <span>Accueil</span>
                </RouterLink>
            </li>

            <!-- Ajout d'onglets prochainement -->

        </ul>
     </nav>
</template>