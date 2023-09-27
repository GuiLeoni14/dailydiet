import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { CreateOrgUseCase } from '../create-org'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeCreateOrgUseCase() {
  const orgsRepository = new PrismaOrgRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new CreateOrgUseCase(orgsRepository, usersRepository)

  return useCase
}
