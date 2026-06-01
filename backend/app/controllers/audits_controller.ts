// app/controllers/audits_controller.ts

import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import AuditEngine from '#services/audit_engine'

export default class AuditsController {
  /* POST /projects/:id/audits - lance un audit d'accessibilite sur un projet de l'utilisateur authentifie, persiste l'audit et ses issues, puis renvoie l'audit cree avec ses issues. */
  async store({ params, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const project = await user.related('projects').query().where('id', params.id).firstOrFail()

    const engine = new AuditEngine()
    const results = await engine.run(project.url)

    const score = engine.computeScore(results.violations)
    const issuesData = engine.mapViolationsToIssues(results.violations)

    const audit = await project.related('audits').create({
      score,
      rawData: results,
      testedAt: DateTime.now(),
    })

    await audit.related('issues').createMany(issuesData)

    await audit.load('issues')

    return response.created(audit)
  }
}
