import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        description: 'some desc',
        phone: '1199999999',
        latitude: -23.5483836,
        longitude: -46.1926104,
      },
    })

    const response = await request(app.server)
      .post(`/check-ins/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -23.5483836,
        longitude: -46.1926104,
      })
    console.log(gym)
    expect(response.statusCode).toEqual(201)
  })
})
