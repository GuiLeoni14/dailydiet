import { FetchAvailablePetsPerCityUseCase } from './../fetch-available-pets-per-city'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeFetchAvailablePetsPerCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchAvailablePetsPerCityUseCase(petsRepository)

  return useCase
}
