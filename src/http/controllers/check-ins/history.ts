import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-in-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryBodyQuerySchema = z.object({
    page: z.number().min(1).default(1),
  })

  const { page } = checkInHistoryBodyQuerySchema.parse(request.params)

  const fetchUsercheckInHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await fetchUsercheckInHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
