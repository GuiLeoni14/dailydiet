import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreateOrgUseCase } from './create-org'

let orgsRepository: OrgsRepository
let sut: CreateOrgUseCase

describe('Pet use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create org', async () => {
    const { org } = await sut.execute({
      name: 'Org 1',
      whatsappNumber: '(35) 9989786332',
      address: 'cidade-mg',
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.name).toEqual('Org 1')
  })
})
