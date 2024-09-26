import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/repositories/utils/test/create-and-authenticate-user'

describe('Gym Controller(e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescrit gym',
        description: 'Some description',
        phone: '9834557623',
        latitude: -1.4461253,
        longitude: -48.507741,
      })

    expect(response.statusCode).toEqual(201)
  })
})
