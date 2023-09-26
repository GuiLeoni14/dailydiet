import { PetsRepository } from '@/repositories/pets-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { FetchPetsPerCharacteristics } from './fetch-pets-per-characteristics'

let petsRepository: PetsRepository
let sut: FetchPetsPerCharacteristics

describe('Fetch Pets Per Characteristics Use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsPerCharacteristics(petsRepository)
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
      characteristics: 'olhos castanhos',
      city: 'machado',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'xerife' })])
  })
})
