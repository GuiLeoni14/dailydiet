import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetUseCaseProps {
  orgId: string
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
    orgId,
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
      org_id: orgId,
    })

    return {
      pet,
    }
  }
}
