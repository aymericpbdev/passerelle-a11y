import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashBoardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard',
    },
    {
      path: '/projects/:id',
      name: 'project-detail',
      component: () => import('@/views/ProjectDetailView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

/*
Guard exécuté avant chaque navigation.
Détecte si l'URL contient un hash d'authentification (cas de redirection depuis le backend après login) et restaure l'état d'auth avant de rediriger vers la même route sans le hash.
*/
router.beforeEach((to) => {
  /*
  Si la navigation cible contient un hash qui ressemble à un token d'auth, on traite le hash via le store puis on redirige vers la même route propre.
  Le test sur 'token=' protège contre les hashs Vue Router légitimes (ancres de page) qui ne contiennent pas de token.
  */
  if (to.hash && to.hash.includes('token=')) {
    const authStore = useAuthStore()
    const restored = authStore.restoreFromUrl()
    if (restored) {
      /*
      Redirection vers la même route, sans le hash.
      Retourner un objet route redirige Vue Router vers cette nouvelle navigation.
      Le replace est implicite dans la nouvelle API quand on retourne un objet depuis un beforeEach.
      */
      return { path: to.path, query: to.query, hash: '', replace: true }
    }
  }

  /*
  Protection des routes privées.
  Si la route cible exige une authentification et que l'utilisateur n'est pas authentifié, redirection vers la page de connexion du backend avec un paramètre qui permettra d'afficher un message explicatif.
  */
  if (to.meta.requiresAuth) {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) {
      window.location.href = 'http://localhost:3333/login.html?reason=auth-required'
      return false
    }
  }

  /*
  Pas de hash d'auth, ou restoreFromUrl a échoué, ou route publique, ou utilisateur authentifié sur route privée : on laisse passer.
  */
})

export default router
