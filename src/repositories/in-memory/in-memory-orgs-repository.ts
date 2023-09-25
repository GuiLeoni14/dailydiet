import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      address: data.address,
      name: data.name,
      whatsappNumber: data.whatsappNumber,
      user_id: data.user_id,
    } satisfies Org

    return org
  }
}
