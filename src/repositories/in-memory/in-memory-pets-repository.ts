import { Pet, Prisma } from '@prisma/client'
import {
  FindAvailableByCityParams,
  FindByAdoptionParams,
  FindByCharacteristicsParams,
  PetsRepository,
} from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      characteristics: data.characteristics,
      city: data.city,
      isAvailableAdoption: data.isAvailableAdoption,
      org_id: data.org_id,
    } satisfies Pet

    this.items.push(pet)

    return pet
  }

  async findAvailableByCity({ city }: FindAvailableByCityParams) {
    const pets = this.items.filter(
      (pet) => pet.city.includes(city) && pet.isAvailableAdoption,
    )

    return pets
  }

  async findByCharacteristicsAndCity({
    characteristics,
    city,
  }: FindByCharacteristicsParams) {
    const pets = this.items.filter(
      (pet) =>
        pet.characteristics.includes(characteristics) && pet.city === city,
    )

    return pets
  }

  async findAvailableById({ petId }: FindByAdoptionParams) {
    const pet = this.items.find(
      (pet) => pet.isAvailableAdoption && pet.id === petId,
    )

    return pet ?? null
  }
}
