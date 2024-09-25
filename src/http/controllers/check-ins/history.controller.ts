import { makeFetchCheckInsUseCase } from '@/use-cases/factories/make-fetch-user-of-check-ins-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchCheckInsUseCase = makeFetchCheckInsUseCase()

  const { checkIns } = await fetchCheckInsUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({ checkIns })
}
