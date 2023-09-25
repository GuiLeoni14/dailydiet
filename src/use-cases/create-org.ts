import { OrgsRepository } from '@/repositories/orgs-repository'
import { UsersRepository } from '@/repositories/users-respository'
import { Org } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateOrgUseCaseRequest {
  userId: string
  name: string
  whatsappNumber: string
  address: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    name,
    address,
    whatsappNumber,
    userId,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const org = await this.orgsRepository.create({
      name,
      address,
      whatsappNumber,
      user_id: userId,
    })

    return {
      org,
    }
  }
}
