// app/services/audit_engine.ts

import puppeteer from 'puppeteer'
import { AxePuppeteer } from '@axe-core/puppeteer'
import type { AxeResults } from 'axe-core'

export default class AuditEngine {
  /*
   Lance un audit d'accessibilite sur une URL donnee.
   Ouvre un navigateur headless, charge la page, attend la fin du rendu, lance Axe-core, puis renvoie le rapport complet.
   Le navigateur est ferme dans tous les cas, meme en cas d'erreur.
   */
  async run(url: string): Promise<AxeResults> {
    const browser = await puppeteer.launch()

    try {
      const page = await browser.newPage()
      await page.goto(url, { waitUntil: 'networkidle0' })
      const results = await new AxePuppeteer(page).analyze()
      return results
    } finally {
      await browser.close()
    }
  }

  /* Calcule un score sur 100 a partir des violations. 
  On part de 100 et on retranche des points selon la gravite de chaque violation, avec un plancher a 0. Le calcul se fait au niveau de la violation (regle enfreinte), pas au niveau de chaque element concerne. 
  Un impact manquant est traite comme minor. Bareme volontairement simple pour le MVP. */
  computeScore(violations: AxeResults['violations']): number {
    const penalties: Record<string, number> = {
      critical: 10,
      serious: 7,
      moderate: 3,
      minor: 1,
    }

    let score = 100

    for (const violation of violations) {
      const impact = violation.impact ?? 'minor'
      const penalty = penalties[impact] ?? penalties.minor
      score -= penalty
    }

    return Math.max(0, score)
  }

  /* Transforme les violations Axe en lignes pretes a inserer dans la table issues. 
  On produit une entree par element concerne (node), pas par regle, pour que l'utilisateur sache exactement quel element corriger. */
  mapViolationsToIssues(violations: AxeResults['violations']) {
    const issues = []

    for (const violation of violations) {
      for (const node of violation.nodes) {
        issues.push({
          type: violation.id,
          severity: violation.impact ?? 'minor',
          element: node.html,
          description: violation.help,
          recommendation: violation.helpUrl,
        })
      }
    }

    return issues
  }
}
