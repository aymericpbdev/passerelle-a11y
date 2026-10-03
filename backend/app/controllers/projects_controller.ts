// app/controllers/projects_controller.ts

import type { HttpContext } from '@adonisjs/core/http'
import { createProjectValidator } from '#validators/project'

export default class ProjectsController {
  /* POST /projects - cree un projet pour l'utilisateur authentifie */
  async store({ request, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const payload = await request.validateUsing(createProjectValidator)

    const project = await user.related('projects').create({
      ...payload,
      isPublic: false,
    })

    return response.created(project)
  }

  /* GET /projects - liste les projets de l'utilisateur authentifie */
  async index({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const projects = await user.related('projects').query().orderBy('created_at', 'desc')

    return response.ok(projects)
  }

  /* GET /projects/:id - affiche un projet de l'utilisateur authentifie */
  async show({ params, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const project = await user.related('projects').query().where('id', params.id).firstOrFail()

    return response.ok(project)
  }
}
