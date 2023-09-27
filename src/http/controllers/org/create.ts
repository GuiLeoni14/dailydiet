import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createOrgBodySchema = z.object({
    userId: z.string(),
    name: z.string(),
    whatsappNumber: z.string(),
    address: z.string(),
  })

  const { userId, name, address, whatsappNumber } = createOrgBodySchema.parse(
    req.body,
  )

  const createOrgUseCase = makeCreateOrgUseCase()

  await createOrgUseCase.execute({
    userId,
    name,
    address,
    whatsappNumber,
  })

  return res.status(201).send()
}
