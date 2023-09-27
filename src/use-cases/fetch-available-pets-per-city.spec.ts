import { PetsRepository } from '@/repositories/pets-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { FetchAvailablePetsPerCityUseCase } from './fetch-available-pets-per-city'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

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
      org_id: 'teste',
    })

    await petsRepository.create({
      name: 'xerife',
      characteristics: 'olhos castanhos, pelo marrom e preto',
      city: 'machado',
      isAvailableAdoption: false,
      org_id: 'teste',
    })

    const { pets } = await sut.execute({
      city: 'machado',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'diana' })])
  })
})
