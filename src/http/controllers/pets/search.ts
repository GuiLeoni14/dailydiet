import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(req: FastifyRequest, res: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    query: z.string().optional(),
    city: z.string(),
    page: z.coerce.number(),
  })

  const { city, query, page } = searchPetsQuerySchema.parse(req.query)

  const searchPetsUseCase = makeSearchPetsUseCase()

  const { pets } = await searchPetsUseCase.execute({
    city,
    page,
    query,
  })

  return res.status(200).send({
    pets,
  })
}
