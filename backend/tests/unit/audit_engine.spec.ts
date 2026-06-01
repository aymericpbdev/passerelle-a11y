import { test } from '@japa/runner'
import type { AxeResults } from 'axe-core'
import AuditEngine from '#services/audit_engine'

/* Fabrique une fausse violation Axe minimale pour tester computeScore. Seul le champ impact est utilise par cette methode, on ne renseigne que lui et on force le type. */
function fakeViolationForScore(impact: string | null) {
  return { impact } as unknown as AxeResults['violations'][number]
}

/* Fabrique une fausse violation Axe pour tester mapViolationsToIssues. Cette methode utilise id, impact, help, helpUrl et le tableau nodes avec le html de chaque noeud. On fournit donc ces champs, et on accepte une liste de html pour generer autant de noeuds. */
function fakeViolationForMapping(options: {
  id: string
  impact: string | null
  help: string
  helpUrl: string
  nodesHtml: string[]
}) {
  return {
    id: options.id,
    impact: options.impact,
    help: options.help,
    helpUrl: options.helpUrl,
    nodes: options.nodesHtml.map((html) => ({ html })),
  } as unknown as AxeResults['violations'][number]
}

test.group('AuditEngine computeScore', () => {
  test('renvoie 100 quand il n y a aucune violation', ({ assert }) => {
    const engine = new AuditEngine()

    const score = engine.computeScore([])

    assert.equal(score, 100)
  })

  test('retranche les bonnes penalites selon la gravite', ({ assert }) => {
    const engine = new AuditEngine()

    const violations = [
      fakeViolationForScore('critical'),
      fakeViolationForScore('serious'),
      fakeViolationForScore('moderate'),
      fakeViolationForScore('minor'),
    ]

    /* 100 - 10 (critical) - 7 (serious) - 3 (moderate) - 1 (minor) = 79 */
    const score = engine.computeScore(violations)

    assert.equal(score, 79)
  })

  test('ne descend jamais sous zero', ({ assert }) => {
    const engine = new AuditEngine()

    /* Vingt violations critiques retrancheraient 200 points, le plancher doit ramener a 0. */
    const violations = Array.from({ length: 20 }, () => fakeViolationForScore('critical'))

    const score = engine.computeScore(violations)

    assert.equal(score, 0)
  })

  test('traite un impact manquant comme minor', ({ assert }) => {
    const engine = new AuditEngine()

    /* Une violation sans impact doit etre penalisee comme minor, soit 1 point. */
    const violations = [fakeViolationForScore(null)]

    const score = engine.computeScore(violations)

    assert.equal(score, 99)
  })
})

test.group('AuditEngine mapViolationsToIssues', () => {
  test('produit une issue par noeud, pas par violation', ({ assert }) => {
    const engine = new AuditEngine()

    /* Une seule violation, mais trois noeuds concernes. On attend trois issues. */
    const violations = [
      fakeViolationForMapping({
        id: 'color-contrast',
        impact: 'serious',
        help: 'Les elements doivent avoir un contraste suffisant',
        helpUrl: 'https://exemple.com/color-contrast',
        nodesHtml: ['<button>A</button>', '<button>B</button>', '<button>C</button>'],
      }),
    ]

    const issues = engine.mapViolationsToIssues(violations)

    assert.lengthOf(issues, 3)
  })

  test('mappe correctement les champs de chaque issue', ({ assert }) => {
    const engine = new AuditEngine()

    const violations = [
      fakeViolationForMapping({
        id: 'image-alt',
        impact: 'critical',
        help: 'Les images doivent avoir un texte alternatif',
        helpUrl: 'https://exemple.com/image-alt',
        nodesHtml: ['<img src="logo.png">'],
      }),
    ]

    const issues = engine.mapViolationsToIssues(violations)

    assert.deepEqual(issues[0], {
      type: 'image-alt',
      severity: 'critical',
      element: '<img src="logo.png">',
      description: 'Les images doivent avoir un texte alternatif',
      recommendation: 'https://exemple.com/image-alt',
    })
  })

  test('traite un impact manquant comme minor dans la severity', ({ assert }) => {
    const engine = new AuditEngine()

    const violations = [
      fakeViolationForMapping({
        id: 'region',
        impact: null,
        help: 'Tout le contenu doit etre dans des reperes',
        helpUrl: 'https://exemple.com/region',
        nodesHtml: ['<div>contenu</div>'],
      }),
    ]

    const issues = engine.mapViolationsToIssues(violations)

    assert.equal(issues[0].severity, 'minor')
  })

  test('renvoie un tableau vide quand il n y a aucune violation', ({ assert }) => {
    const engine = new AuditEngine()

    const issues = engine.mapViolationsToIssues([])

    assert.lengthOf(issues, 0)
  })
})
