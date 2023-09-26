import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { list } from './list'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/search', search)
  app.get('/pets', list)

  app.post('/pets', { onRequest: verifyJwt }, create)
}
