import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create pet', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const org = await prisma.org.create({
      data: {
        name: 'teste',
        address: 'teste',
        whatsappNumber: 'teste',
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'teste',
        characteristics: 'teste',
        city: 'teste',
        isAvailableAdoption: true,
        orgId: org.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
