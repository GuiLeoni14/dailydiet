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

  await createPetUseCase.execute({
    orgId,
    name,
    characteristics,
    city,
    isAvailableAdoption,
  })

  return res.status(201).send()
}
