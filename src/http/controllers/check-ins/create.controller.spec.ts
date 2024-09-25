import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/repositories/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Check-In Controller(e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Typescrit gym',
        latitude: -1.4461253,
        longitude: -48.507741,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -1.4461253,
        longitude: -48.507741,
      })

    expect(response.statusCode).toEqual(201)
  })
})
