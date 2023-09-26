import { Pet } from '@prisma/client'
import { makeFetchPetsPerCharacteristicsUseCase } from '@/use-cases/factories/make-fetch-pets-per-characteristics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchAvailablePetsPerCityUseCase } from '@/use-cases/factories/make-fetch-available-pets-per-city'

export async function search(req: FastifyRequest, res: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string(),
    characteristics: z.string().optional(),
  })

  const { city, characteristics } = searchPetsQuerySchema.parse(req.query)
  let petsResponse: Pet[] = []

  const fetchPetsPerCharacteristicsUseCase =
    makeFetchPetsPerCharacteristicsUseCase()

  const fetchAvailablePetsPerCityUseCase =
    makeFetchAvailablePetsPerCityUseCase()

  if (characteristics) {
    const { pets } = await fetchPetsPerCharacteristicsUseCase.execute({
      city,
      characteristics,
    })
    petsResponse = pets
  } else {
    const { pets } = await fetchAvailablePetsPerCityUseCase.execute({
      city,
    })
    petsResponse = pets
  }

  return res.status(200).send({
    pets: petsResponse,
  })
}
