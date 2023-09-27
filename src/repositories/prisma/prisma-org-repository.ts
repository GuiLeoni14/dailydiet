import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgRepository implements OrgsRepository {
  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}
