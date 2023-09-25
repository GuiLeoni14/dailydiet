import { PetsRepository } from '@/repositories/pets-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { FetchAvailablePetUseCase } from './fetch-available-pet'

let petsRepository: PetsRepository
let sut: FetchAvailablePetUseCase

describe('Pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchAvailablePetUseCase(petsRepository)
  })

  it('should be able to search available pet', async () => {
    const { id: petId } = await petsRepository.create({
      name: 'diana',
      characteristics: 'olhos azuis, pelo marrom e branco',
      city: 'machado',
      isAvailableAdoption: true,
    })

    const { pet } = await sut.execute({
      petId,
    })

    expect(pet).toBeDefined()
  })

  it('not should be able to search not available pet', async () => {
    const { id: petId } = await petsRepository.create({
      name: 'diana',
      characteristics: 'olhos azuis, pelo marrom e branco',
      city: 'machado',
      isAvailableAdoption: false,
    })

    const { pet } = await sut.execute({
      petId,
    })

    expect(pet).toEqual(null)
  })
})
