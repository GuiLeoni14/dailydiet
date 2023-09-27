import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../create-pet'
import { PrismaOrgRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgRepository()
  const useCase = new CreatePetUseCase(petsRepository, orgsRepository)

  return useCase
}
