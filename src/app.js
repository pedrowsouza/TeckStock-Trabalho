
import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { materialsRoutes } from './routes/materials-routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function buildApp() {
  const app = Fastify({ logger: true })

  app.register(cors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })

  app.register(materialsRoutes, { prefix: '/materials' })

  app.register(fastifyStatic, {
    root: path.join(__dirname, '../frontend/dist'),
    prefix: '/'
  })

  return app
}
