import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchemna = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { description, phone, latitude, longitude, title } =
    createGymBodySchemna.parse(request.body)

  const createGymUseCase = makeCreateGymUseCase()

  await createGymUseCase.execute({
    description,
    phone,
    latitude,
    longitude,
    title,
  })

  return reply.status(201).send()
}
