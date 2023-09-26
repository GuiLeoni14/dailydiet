import { makeFetchAvailablePetUseCase } from '@/use-cases/factories/make-fetch-available-pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function list(req: FastifyRequest, res: FastifyReply) {
  const listPetsPerCityQuerySchema = z.object({
    petId: z.string(),
  })
  const fetchAvailablePetUseCase = makeFetchAvailablePetUseCase()

  const { petId } = listPetsPerCityQuerySchema.parse(req.query)

  const { pet } = await fetchAvailablePetUseCase.execute({
    petId,
  })

  return res.status(200).send({
    pet,
  })
}
