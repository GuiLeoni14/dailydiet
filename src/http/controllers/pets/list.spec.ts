import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('List Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list pets per city', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await prisma.pet.create({
      data: {
        name: 'teste',
        characteristics: 'teste',
        city: 'teste',
        isAvailableAdoption: true,
      },
    })

    const response = await request(app.server)
      .get('/pets')
      .set('Authorization', `Bearer ${token}`)
      .query({
        city: 'teste',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
  })
})
