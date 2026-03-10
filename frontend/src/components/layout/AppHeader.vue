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
                <RouterLink to="/dashboard" class="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors" aria-current-value="page">
                    Tableau de bord
                </RouterLink>
            </nav>

            <!-- Actions utilisateur -->
            <!-- Modifications/améliorations/ajouts au Ticket#16-->
            <div class="flax items-center gap-3">
                <span class="text-sm text-gray-500 hidden md:inline">
                    Mon compte
                </span>
            </div>
            
        </div>
    </header>
</template>