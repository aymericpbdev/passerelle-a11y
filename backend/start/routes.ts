/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/health', async () => {
  return {
    status: 'ok',
    message: 'Passerelle A11y API',
    timestamp: new Date().toISOString(),
  }
})
