import { Prisma, Pet } from '@prisma/client'

export interface FindAvailableByCityParams {
  city: string
}

export interface FindByCharacteristicsParams {
  characteristics: string
  city: string
}

export interface FindByAdoptionParams {
  petId: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findAvailableByCity(params: FindAvailableByCityParams): Promise<Pet[]>
  findByCharacteristicsAndCity(
    params: FindByCharacteristicsParams,
  ): Promise<Pet[]>
  findAvailableById(params: FindByAdoptionParams): Promise<Pet | null>
}
