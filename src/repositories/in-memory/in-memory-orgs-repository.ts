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

    this.items.push(org)

    return org
  }

  async findById(id: string) {
    return this.items.find((item) => item.id === id) ?? null
  }

  async findByUserId(userId: string) {
    return this.items.find((item) => item.user_id === userId) ?? null
  }
}
