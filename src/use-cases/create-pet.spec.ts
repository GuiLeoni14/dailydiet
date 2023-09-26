import { PetsRepository } from '@/repositories/pets-repository'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { describe, it, expect, beforeEach } from 'vitest'

let petsRepository: PetsRepository
let sut: CreatePetUseCase

describe('Pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create pet', async () => {
    const { pet } = await sut.execute({
      name: 'diana',
      characteristics: 'olhos azuis, pelo marrom e branco',
      city: 'machado',
      isAvailableAdoption: true,
      orgId: 'teste',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('diana')
  })
})
