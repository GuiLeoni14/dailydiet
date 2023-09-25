import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { UsersRepository } from '@/repositories/users-respository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: OrgsRepository
let usersRepository: UsersRepository
let sut: CreateOrgUseCase

describe('Pet use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateOrgUseCase(orgsRepository, usersRepository)
  })

  it('should be able to create org', async () => {
    const user = await usersRepository.create({
      name: 'Guilherme',
      email: 'teste@gmail.com',
      password_hash: '123',
    })

    const { org } = await sut.execute({
      name: 'Org 1',
      whatsappNumber: '(35) 9989786332',
      address: 'cidade-mg',
      userId: user.id,
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.name).toEqual('Org 1')
  })

  it('should be able to not create an organization with an undefined user', async () => {
    await expect(() =>
      sut.execute({
        name: 'Org 1',
        whatsappNumber: '(35) 9989786332',
        address: 'cidade-mg',
        userId: '123',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
