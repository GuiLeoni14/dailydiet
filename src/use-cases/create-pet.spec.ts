import { PetsRepository } from '@/repositories/pets-repository'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: PetsRepository
let orgsRepository: OrgsRepository
let sut: CreatePetUseCase

describe('Pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create pet', async () => {
    const org = await orgsRepository.create({
      name: 'Org 1',
      whatsappNumber: '(35) 9989786332',
      address: 'cidade-mg',
      user_id: 'teste',
    })

    const { pet } = await sut.execute({
      name: 'diana',
      characteristics: 'olhos azuis, pelo marrom e branco',
      city: 'machado',
      isAvailableAdoption: true,
      orgId: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('diana')
  })
  it('should be able to not create an pet with an undefined org', async () => {
    await expect(() =>
      sut.execute({
        name: 'diana',
        characteristics: 'olhos azuis, pelo marrom e branco',
        city: 'machado',
        isAvailableAdoption: true,
        orgId: 'teste',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
