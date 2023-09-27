import { makeFetchAvailablePetsPerCityUseCase } from '@/use-cases/factories/make-fetch-available-pets-per-city'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function list(req: FastifyRequest, res: FastifyReply) {
  const listPetsPerCityQuerySchema = z.object({
    city: z.string(),
    page: z.coerce.number(),
  })

  const { city, page } = listPetsPerCityQuerySchema.parse(req.query)

  const fetchAvailablePetsPerCityUseCase =
    makeFetchAvailablePetsPerCityUseCase()

  const { pets } = await fetchAvailablePetsPerCityUseCase.execute({
    city,
    page,
  })

  return res.status(200).send({
    pets,
  })
}
