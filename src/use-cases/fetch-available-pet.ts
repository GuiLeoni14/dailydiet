import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchAvailableRequest {
  petId: string
}

interface FetchAvailableResponse {
  pet: Pet
}

export class FetchAvailablePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: FetchAvailableRequest): Promise<FetchAvailableResponse> {
    const pet = await this.petsRepository.findAvailableById({
      petId,
    })

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
