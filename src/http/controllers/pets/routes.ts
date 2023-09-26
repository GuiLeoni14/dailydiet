import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { list } from './list'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/pets', create)
  app.get('/pets/search', search)
  app.get('/pets', list)
}
