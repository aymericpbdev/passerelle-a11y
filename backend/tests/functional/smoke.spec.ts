import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/* Les deux tests d'inscription envoient volontairement le meme email. Si la base n'etait pas remise a zero entre les tests, le second recevrait un 409 au lieu d'un 201. */
const sharedRegistrationPayload = {
  fullName: 'Utilisateur de test',
  email: 'utilisateur.test@example.com',
  password: 'mot-de-passe-de-test',
}

test.group('Smoke, isolation de la base entre les tests', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('GET /api/test repond 200', async ({ client }) => {
    const response = await client.get('/api/test')

    response.assertStatus(200)
  })

  test('premiere inscription avec cet email', async ({ client }) => {
    const response = await client.post('/api/auth/register').json(sharedRegistrationPayload)

    response.assertStatus(201)
  })

  test('seconde inscription avec le meme email', async ({ client }) => {
    const response = await client.post('/api/auth/register').json(sharedRegistrationPayload)

    response.assertStatus(201)
  })
})
