import { PetsRepository } from '@/repositories/pets-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './search-pets'

let petsRepository: PetsRepository
let sut: SearchPetsUseCase

describe('Search Pets UseCase', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(petsRepository)
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

  it('should be able to search available pets per characteristics', async () => {
    await petsRepository.create({
      name: 'diana',
      characteristics: 'olhos azuis, pelo marrom e branco',
      city: 'machado',
      isAvailableAdoption: true,
      org_id: 'teste',
    })

    const { pets } = await sut.execute({
      query: 'olhos azuis',
      city: 'machado',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'diana' })])
  })

  it('should be able to search available pets per name', async () => {
    await petsRepository.create({
      name: 'diana',
      characteristics: 'olhos azuis, pelo marrom e branco',
      city: 'machado',
      isAvailableAdoption: true,
      org_id: 'teste',
    })

    const { pets } = await sut.execute({
      query: 'diana',
      city: 'machado',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'diana' })])
  })

  it('should be able to fetch paginated pets search', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        name: `diana ${i}`,
        characteristics: 'olhos azuis, pelo marrom e branco',
        city: 'machado',
        isAvailableAdoption: true,
        org_id: 'teste',
      })
    }

    const { pets } = await sut.execute({
      query: 'diana',
      city: 'machado',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'diana 21' }),
      expect.objectContaining({ name: 'diana 22' }),
    ])
  })
})
