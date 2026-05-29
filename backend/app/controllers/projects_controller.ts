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
}
