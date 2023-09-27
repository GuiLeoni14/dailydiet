import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { usersRoutes } from './http/controllers/users/routes'
import { petsRoutes } from './http/controllers/pets/routes'
import { orgsRoutes } from './http/controllers/org/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m', // 10 minutes
  },
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _req, res) => {
  if (error instanceof ZodError) {
    return res.status(400).send({
      message: 'Validation Error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // todo: Aqui a gente deveria fazer o logo para uma ferramenta externa como DATA DOG/ Sentry
  }

  return res.status(500).send({
    message: 'Internal server error.',
  })
})
