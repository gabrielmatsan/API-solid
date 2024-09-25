import { makeSearchGymUseCase } from '@/use-cases/factories/make-search-gym-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodyParams = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = createGymBodyParams.parse(request.query)

  const searchGymUseCase = makeSearchGymUseCase()

  const { gyms } = await searchGymUseCase.execute({
    query,
    page,
  })

  return reply.status(200).send({ gyms })
}
