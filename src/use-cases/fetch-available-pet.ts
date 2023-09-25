import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchAvailableRequest {
  petId: string
}

interface FetchAvailableResponse {
  pet: Pet | null
}

export class FetchAvailablePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: FetchAvailableRequest): Promise<FetchAvailableResponse> {
    const pet = await this.petsRepository.findAvailableById({
      petId,
    })

    return {
      pet,
    }
  }
}
