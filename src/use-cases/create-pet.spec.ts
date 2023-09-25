import { PetsRepository } from '@/repositories/pets-repository'
import { CreatePetsUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { describe, it, expect, beforeEach } from 'vitest'

let petsRepository: PetsRepository
let sut: CreatePetsUseCase

describe('Pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetsUseCase(petsRepository)
  })

  it('should be able to create pet', async () => {
    const { pet } = await sut.execute({
      name: 'diana',
      characteristics: 'olhos azuis, pelo marrom e branco',
      city: 'machado',
      isAvailableAdoption: true,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('diana')
  })
})
