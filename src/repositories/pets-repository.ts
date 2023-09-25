import { Prisma, Pet } from '@prisma/client'

export interface FindAvailablePetsByCityParams {
  city: string
}

export interface FindByCharacteristicsParams {
  characteristics: string
}
export interface PetsRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>
  findAvailablePetsByCity(params: FindAvailablePetsByCityParams): Promise<Pet[]>
  findByCharacteristics(params: FindByCharacteristicsParams): Promise<Pet[]>
}
