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
