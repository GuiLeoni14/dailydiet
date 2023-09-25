import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      characteristics: data.characteristics,
      city: data.city,
      isAvailableAdoption: data.isAvailableAdoption,
    } satisfies Pet

    this.items.push(pet)

    return pet
  }
}
