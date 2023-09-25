import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchAvailablePetsPerCityUseCaseRequest {
  city: string
}

interface FetchAvailablePetsPerCityUseCaseResponse {
  pets: Pet[]
}

export class FetchAvailablePetsPerCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FetchAvailablePetsPerCityUseCaseRequest): Promise<FetchAvailablePetsPerCityUseCaseResponse> {
    const pets = await this.petsRepository.findAvailableByCity({
      city,
    })

    return {
      pets,
    }
  }
}
