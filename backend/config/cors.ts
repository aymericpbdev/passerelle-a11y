// config/cors.ts

import { defineConfig } from '@adonisjs/cors'

const corsConfig = defineConfig({
  enabled: true,
  // En dév permet d'autoriser le frontend Vue sur port 5173 et les pages statiques sur port 3333
  // En prod à remplacer par le domaine
  origin: ['http://localhost:5173', 'http://localhost:3333'],
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
  headers: true,
  credentials: true,
  maxAge: 90,
})

export default corsConfig
