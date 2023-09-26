import { FetchPetsPerCharacteristics } from '../fetch-pets-per-characteristics'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeFetchPetsPerCharacteristicsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetsPerCharacteristics(petsRepository)

  return useCase
}
