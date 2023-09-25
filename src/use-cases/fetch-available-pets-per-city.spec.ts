import { PetsRepository } from '@/repositories/pets-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { FetchAvailablePetsPerCityUseCase } from './fetch-available-pets-per-city'

let petsRepository: PetsRepository
let sut: FetchAvailablePetsPerCityUseCase

describe('Fetch Available Pets Per City UseCase', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchAvailablePetsPerCityUseCase(petsRepository)
  })

  it('should be able to search available pets per city', async () => {
    await petsRepository.create({
      name: 'diana',
      characteristics: 'olhos azuis, pelo marrom e branco',
      city: 'machado',
      isAvailableAdoption: true,
    })

    await petsRepository.create({
      name: 'xerife',
      characteristics: 'olhos castanhos, pelo marrom e preto',
      city: 'machado',
      isAvailableAdoption: false,
    })

    const { pets } = await sut.execute({
      city: 'machado',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'diana' })])
  })
})
