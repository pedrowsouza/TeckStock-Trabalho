
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { materialsRoutes } from './routes/materials-routes.js'

export function buildApp() {
    const app = Fastify({ logger: true })

    app.register(cors, {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })

    app.register(materialsRoutes, { prefix: '/materials' })

    return app
}

