import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  console.log('arrived')
  const nearbyGymBodySchemna = z.object({
    userLatitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { userLatitude, userLongitude } = nearbyGymBodySchemna.parse(
    request.query,
  )

  const nearbyGymUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await nearbyGymUseCase.execute({
    userLatitude,
    userLongitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
