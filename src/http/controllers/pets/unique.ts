import { makeFetchAvailablePetUseCase } from '@/use-cases/factories/make-fetch-available-pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function unique(req: FastifyRequest, res: FastifyReply) {
  const uniquePetQuerySchema = z.object({
    petId: z.string(),
  })
  const fetchAvailablePetUseCase = makeFetchAvailablePetUseCase()

  const { petId } = uniquePetQuerySchema.parse(req.params)

  const { pet } = await fetchAvailablePetUseCase.execute({
    petId,
  })

  return res.status(200).send({
    pet,
  })
}
