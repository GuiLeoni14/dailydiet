import { Prisma, Pet } from '@prisma/client'

export interface FindAvailablePetsByCityParams {
  city: string
}
export interface PetsRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>
  findAvailablePetsByCity(params: FindAvailablePetsByCityParams): Promise<Pet[]>
}
