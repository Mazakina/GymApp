import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymBodySchemna = z.object({
    query: z.coerce.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { page, query } = searchGymBodySchemna.parse(request.query)

  const searchGymUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymUseCase.execute({
    page,
    query,
  })

  return reply.status(200).send({
    gyms,
  })
}
