import type { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'john.doe@gmail.examples.com',
    password: 'flamengo',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john.doe@gmail.examples.com',
    password: 'flamengo',
  })
  const { token } = authResponse.body

  return { token }
}
