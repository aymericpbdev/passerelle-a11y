// start/routes.ts

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')

router
  .group(() => {
    // Routes publiques
    router
      .group(() => {
        router.post('/register', [AuthController, 'register'])
        router.post('/login', [AuthController, 'login'])

        // Routes protégées par bearer token
        router
          .group(() => {
            router.delete('/logout', [AuthController, 'logout'])
            router.get('/me', [AuthController, 'me'])
          })
          .use(middleware.auth({ guards: ['api'] }))
      })
      .prefix('/auth')
  })
  .prefix('/api')
  .use(() => import('#middleware/force_json_response_middleware'))
