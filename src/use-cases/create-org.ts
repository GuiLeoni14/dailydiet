import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'

interface CreateOrgUseCaseRequest {
  name: string
  whatsappNumber: string
  address: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}
  async execute({
    name,
    address,
    whatsappNumber,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const org = await this.orgsRepository.create({
      name,
      address,
      whatsappNumber,
    })

    return {
      org,
    }
  }
}
