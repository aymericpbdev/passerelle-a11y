/* Types des entites metier, refletant les structures renvoyees par l'API backend. */

export type Project = {
  id: number
  userId: number
  name: string
  url: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export type Issue = {
  id: number
  auditId: number
  type: string
  severity: string
  element: string
  description: string
  recommendation: string | null
  createdAt: string
  updatedAt: string
}

export type Audit = {
  id: number
  projectId: number
  score: number | null
  testedAt: string | null
  createdAt: string
  updatedAt: string
  issues: Issue[]
}
