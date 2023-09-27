import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createPetBodySchema = z.object({
    orgId: z.string(),
    name: z.string(),
    characteristics: z.string(),
    city: z.string(),
    isAvailableAdoption: z.boolean(),
  })

  const { orgId, name, characteristics, city, isAvailableAdoption } =
    createPetBodySchema.parse(req.body)

  const createPetUseCase = makeCreatePetUseCase()
  try {
    await createPetUseCase.execute({
      orgId,
      name,
      characteristics,
      city,
      isAvailableAdoption,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(409).send({
        error: error.message,
      })
    }
    throw error
  }

  return res.status(201).send()
}
