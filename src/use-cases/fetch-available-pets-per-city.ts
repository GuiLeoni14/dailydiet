import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchAvailablePetsPerCityUseCaseRequest {
  city: string
  page: number
}

interface FetchAvailablePetsPerCityUseCaseResponse {
  pets: Pet[]
}

export class FetchAvailablePetsPerCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
  }: FetchAvailablePetsPerCityUseCaseRequest): Promise<FetchAvailablePetsPerCityUseCaseResponse> {
    const pets = await this.petsRepository.searchMany({
      city,
      page,
    })

    return {
      pets,
    }
  }
}
