import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchAvailablePetUseCase } from '../fetch-available-pet'

export function makeFetchAvailablePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchAvailablePetUseCase(petsRepository)

  return useCase
}
