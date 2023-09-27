import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Search Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets without characteristics', async () => {
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

    const response = await request(app.server).get('/pets/search').query({
      city: 'teste',
      page: 1,
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets with characteristics and city', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'teste-02',
        name: 'teste-02',
        password_hash: 'teste-02',
      },
    })

    const org = await prisma.org.create({
      data: {
        name: 'teste-02',
        address: 'teste-02',
        whatsappNumber: 'teste-02',
        user_id: user.id,
      },
    })

    await prisma.pet.create({
      data: {
        name: 'teste-02',
        characteristics: 'teste-02',
        city: 'teste-02',
        isAvailableAdoption: true,
        org_id: org.id,
      },
    })

    const response = await request(app.server).get('/pets/search').query({
      city: 'teste-02',
      query: 'teste',
      page: 1,
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able not to search pets without city', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'teste-03',
        name: 'teste-03',
        password_hash: 'teste-03',
      },
    })

    const org = await prisma.org.create({
      data: {
        name: 'teste-03',
        address: 'teste-03',
        whatsappNumber: 'teste-03',
        user_id: user.id,
      },
    })

    await prisma.pet.create({
      data: {
        name: 'teste-03',
        characteristics: 'teste-03',
        city: 'teste-03',
        isAvailableAdoption: true,
        org_id: org.id,
      },
    })

    const response = await request(app.server).get('/pets/search').query({
      query: 'teste',
      page: 1,
    })
    expect(response.statusCode).toEqual(400)
  })
})
