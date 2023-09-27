import { Prisma } from '@prisma/client'
import {
  FindAvailableByCityParams,
  FindByAdoptionParams,
  FindByCharacteristicsParams,
  PetsRepository,
  SearchManyParams,
} from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findAvailableByCity(params: FindAvailableByCityParams) {
    const pets = await prisma.pet.findMany({
      where: {
        city: params.city,
        isAvailableAdoption: true,
      },
    })

    return pets
  }

  async findAvailableById(params: FindByAdoptionParams) {
    const pet = await prisma.pet.findFirst({
      where: {
        id: params.petId,
        isAvailableAdoption: true,
      },
    })

    return pet
  }

  async findByCharacteristicsAndCity(params: FindByCharacteristicsParams) {
    const pets = await prisma.pet.findMany({
      where: {
        city: params.city,
        characteristics: {
          contains: params.characteristics,
        },
        isAvailableAdoption: true,
      },
    })

    return pets
  }

  async searchMany({ city, query, page }: SearchManyParams) {
    const pets = await prisma.pet.findMany({
      where: {
        name: {
          contains: query,
        },
        characteristics: {
          contains: query,
        },
        city,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }
}
