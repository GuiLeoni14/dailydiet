import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetUseCaseProps {
  name: string
  characteristics: string
  city: string
  isAvailableAdoption: boolean
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    characteristics,
    city,
    isAvailableAdoption,
  }: CreatePetUseCaseProps): Promise<CreatePetUseCaseResponse> {
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
