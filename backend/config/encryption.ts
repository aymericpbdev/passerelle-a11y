import env from '#start/env'
import { defineConfig, drivers } from '@adonisjs/core/encryption'

export default defineConfig({
  default: 'legacy',
  list: {
    // 'legacy' utilise le même algorithme que AdonisJS 6
    // Garantit que les données chiffrées existantes restent déchiffrables
    legacy: drivers.legacy({
      keys: [env.get('APP_KEY')],
    }),
  },
})
