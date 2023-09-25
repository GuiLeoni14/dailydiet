import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetsUseCaseProps {
  name: string
  characteristics: string
  city: string
  isAvailableAdoption: boolean
}

interface CreatePetsUseCaseResponse {
  pet: Pet
}

export class CreatePetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    characteristics,
    city,
    isAvailableAdoption,
  }: CreatePetsUseCaseProps): Promise<CreatePetsUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      characteristics,
      city,
      isAvailableAdoption,
    })

    return {
      pet,
    }
  }
}
