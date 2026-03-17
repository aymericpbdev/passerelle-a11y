// app/controllers/auth_controller.ts

import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator, loginValidator } from '#validators/auth'

export default class AuthController {
  // POST /api/auth/register
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const existingUser = await User.findBy('email', payload.email)
    if (existingUser) {
      return response.conflict({ message: 'Cet email est déjà utilisé.' })
    }

    const user = await User.create({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
    })

    return response.created({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    })
  }

  // POST /api/auth/login
  async login({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    const token = await auth.use('api').createToken(user)

    return response.ok({
      token: {
        type: 'bearer',
        value: token.value!.release(),
      },
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    })
  }

  // DELETE /api/auth/logout
  // Route protégée par bearer token
  async logout({ response, auth }: HttpContext) {
    await auth.use('api').invalidateToken()
    return response.ok({ message: 'Déconnecté avec succès.' })
  }

  // GET /api/auth/me
  // Route protégée par bearer token
  async me({ response, auth }: HttpContext) {
    const user = await auth.getUserOrFail()

    return response.ok({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      createdAt: user.createdAt,
    })
  }
}
