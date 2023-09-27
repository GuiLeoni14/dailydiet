import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', { onRequest: verifyJwt }, create)
}
