import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetsPerCharacteristicsRequest {
  characteristics: string
  city: string
}

interface FetchPetsPerCharacteristicsResponse {
  pets: Pet[]
}

export class FetchPetsPerCharacteristics {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    characteristics,
    city,
  }: FetchPetsPerCharacteristicsRequest): Promise<FetchPetsPerCharacteristicsResponse> {
    const pets = await this.petsRepository.findByCharacteristicsAndCity({
      characteristics,
      city,
    })

    return {
      pets,
    }
  }
}
