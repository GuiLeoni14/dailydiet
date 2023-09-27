import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

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
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    orgId,
    name,
    characteristics,
    city,
    isAvailableAdoption,
  }: CreatePetUseCaseProps): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

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
