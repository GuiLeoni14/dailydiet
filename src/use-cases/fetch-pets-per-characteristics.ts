import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetsPerCharacteristicsRequest {
  characteristics: string
}

interface FetchPetsPerCharacteristicsResponse {
  pets: Pet[]
}

export class FetchPetsPerCharacteristics {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    characteristics,
  }: FetchPetsPerCharacteristicsRequest): Promise<FetchPetsPerCharacteristicsResponse> {
    const pets = await this.petsRepository.findByCharacteristics({
      characteristics,
    })

    return {
      pets,
    }
  }
}
