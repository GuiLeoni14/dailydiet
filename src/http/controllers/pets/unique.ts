import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFetchAvailablePetUseCase } from '@/use-cases/factories/make-fetch-available-pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function unique(req: FastifyRequest, res: FastifyReply) {
  const uniquePetQuerySchema = z.object({
    petId: z.string(),
  })
  const fetchAvailablePetUseCase = makeFetchAvailablePetUseCase()

  const { petId } = uniquePetQuerySchema.parse(req.params)

  try {
    const { pet } = await fetchAvailablePetUseCase.execute({
      petId,
    })

    return res.status(200).send({
      pet,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(409).send({
        error: error.message,
      })
    }
    throw error
  }
}
