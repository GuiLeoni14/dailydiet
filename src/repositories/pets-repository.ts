import { Prisma, Pet } from '@prisma/client'

export interface FindAvailableByCityParams {
  city: string
}

export interface FindByCharacteristicsParams {
  characteristics: string
}

export interface FindByAdoptionParams {
  petId: string
}

export interface PetsRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>
  findAvailableByCity(params: FindAvailableByCityParams): Promise<Pet[]>
  findByCharacteristics(params: FindByCharacteristicsParams): Promise<Pet[]>
  findAvailableById(params: FindByAdoptionParams): Promise<Pet | null>
}
