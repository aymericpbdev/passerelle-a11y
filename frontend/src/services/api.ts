/*
Client HTTP centralisé pour les appels à l'API backend.
Centralise l'URL de base, les en-têtes par défaut, l'injection automatique du token d'authentification, et la gestion des erreurs.
*/

const API_BASE_URL = 'http://localhost:3333'

/*
Structure d'erreur retournée par l'API en cas d'échec.
Tableau errors présent dans tous les cas d'erreur (validation Vine 422, credentials invalides 400, conflit 409, etc.).
*/
export type ApiError = {
  status: number
  errors: Array<{
    message: string
    field?: string
    rule?: string
    meta?: Record<string, unknown>
  }>
}

/*
Récupère le token d'authentification depuis le localStorage.
Retourne null si l'utilisateur n'est pas connecté.
*/
function getAuthToken(): string | null {
  return localStorage.getItem('auth_token')
}

/*
Construit les en-têtes par défaut, en injectant le token si disponible.
*/
function buildHeaders(extra?: HeadersInit): Headers {
  const headers = new Headers(extra)

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json')
  }

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const token = getAuthToken()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  return headers
}

/*
Wrapper principal autour de fetch.
Concatène l'URL de base avec le chemin fourni, applique les en-têtes,
parse le JSON automatiquement, et lance une ApiError en cas d'échec.
*/
async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`
  const headers = buildHeaders(options.headers)

  let response: Response
  try {
    response = await fetch(url, { ...options, headers })
  } catch {
    throw {
      status: 0,
      errors: [{ message: 'Impossible de contacter le serveur.' }],
    } as ApiError
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw {
      status: response.status,
      errors: data?.errors ?? [{ message: 'Une erreur est survenue.' }],
    } as ApiError
  }

  return data as T
}

/*
Helpers par méthode HTTP pour un usage plus naturel dans le code appelant.
*/
export const api = {
  get<T>(path: string): Promise<T> {
    return apiFetch<T>(path, { method: 'GET' })
  },

  post<T>(path: string, body?: unknown): Promise<T> {
    return apiFetch<T>(path, {
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  },

  patch<T>(path: string, body?: unknown): Promise<T> {
    return apiFetch<T>(path, {
      method: 'PATCH',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  },

  delete<T>(path: string): Promise<T> {
    return apiFetch<T>(path, { method: 'DELETE' })
  },
}
