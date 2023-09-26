import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('List Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list pets per city', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'teste',
        name: 'teste',
        password_hash: 'teste',
      },
    })

    const org = await prisma.org.create({
      data: {
        name: 'teste',
        address: 'teste',
        whatsappNumber: 'teste',
        user_id: user.id,
      },
    })

    await prisma.pet.create({
      data: {
        name: 'teste',
        characteristics: 'teste',
        city: 'teste',
        isAvailableAdoption: true,
        org_id: org.id,
      },
    })

    const response = await request(app.server).get('/pets').query({
      city: 'teste',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
  })
})
