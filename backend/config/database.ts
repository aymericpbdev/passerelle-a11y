import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: env.get('DB_CONNECTION') as 'sqlite' | 'postgres',
  connections: {
    sqlite: {
      client: 'better-sqlite3',
      connection: {
        filename: env.get('DB_DATABASE', 'tmp/db.sqlite3'),
      },
      useNullAsDefault: true,
    },
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST', '127.0.0.1'),
        port: Number(env.get('DB_PORT') ?? 5432),
        user: env.get('DB_USER') ?? 'postgres',
        password: env.get('DB_PASSWORD') ?? '',
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
