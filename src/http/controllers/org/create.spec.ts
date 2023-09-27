import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create org', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const response = await request(app.server)
      .post('/orgs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'teste',
        address: 'teste',
        whatsappNumber: 'teste',
        userId: user.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
