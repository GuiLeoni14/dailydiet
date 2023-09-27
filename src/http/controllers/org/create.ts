import { OrgAlreadyCreatedByUserError } from '@/use-cases/errors/org-already-created-by-user-error '
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
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

  try {
    await createOrgUseCase.execute({
      userId,
      name,
      address,
      whatsappNumber,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(409).send({
        error: error.message,
      })
    }
    if (error instanceof OrgAlreadyCreatedByUserError) {
      return res.status(409).send({
        error: error.message,
      })
    }
    throw error
  }

  return res.status(201).send()
}
