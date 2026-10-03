// public/assets/js/login.js
'use strict'

const API_BASE_URL = 'http://localhost:3333'
const FRONTEND_URL = 'http://localhost:5173'

const form = document.getElementById('login-form')
const submitButton = form.querySelector('button[type="submit"]')
const formError = document.getElementById('form-error')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const emailError = document.getElementById('email-error')
const passwordError = document.getElementById('password-error')

/*
 Si l'utilisateur arrive depuis l'inscription (login.html?registered=1), on affiche un message de confirmation au-dessus du formulaire.
*/
const urlParams = new URLSearchParams(window.location.search)
if (urlParams.get('registered') === '1') {
  const successMessage = document.createElement('p')
  successMessage.className = 'form-success'
  successMessage.setAttribute('role', 'status')
  successMessage.textContent = 'Compte créé avec succès. Tu peux maintenant te connecter.'
  form.insertAdjacentElement('beforebegin', successMessage)
}

/*
Affiche un message d'avertissement si l'utilisateur a été redirigé depuis le frontend Vue à cause d'une tentative d'accès à une route privée sans être authentifié.
*/
if (urlParams.get('reason') === 'auth-required') {
  const warningMessage = document.createElement('p')
  warningMessage.className = 'form-warning'
  warningMessage.setAttribute('role', 'alert')
  warningMessage.textContent = 'Tu dois être connecté pour accéder à cette page.'
  form.insertAdjacentElement('beforebegin', warningMessage)
}

/*
Réinitialise tous les messages du formulaire : erreurs de champ, erreur globale, et message de succès post-inscription s'il est présent.
*/
function clearFormMessages() {
  formError.hidden = true
  formError.textContent = ''

  emailError.hidden = true
  emailError.textContent = ''
  emailInput.removeAttribute('aria-invalid')

  passwordError.hidden = true
  passwordError.textContent = ''
  passwordInput.removeAttribute('aria-invalid')

  const successMessage = document.querySelector('.form-success')
  if (successMessage) {
    successMessage.remove()
  }

  const warningMessage = document.querySelector('.form-warning')
  if (warningMessage) {
    warningMessage.remove()
  }
}

/*
 Affiche une erreur sur un champ spécifique.
 Met à jour aria-invalid pour les lecteurs d'écran.
*/
function showFieldError(input, errorElement, message) {
  input.setAttribute('aria-invalid', 'true')
  errorElement.textContent = message
  errorElement.hidden = false
}

/*
 Applique les erreurs de validation renvoyées par l'API (cas 422).
 Format attendu : { errors: [{ field, message, rule, meta }] }
*/
function applyApiValidationErrors(errors) {
  const fieldMap = {
    email: { input: emailInput, errorEl: emailError },
    password: { input: passwordInput, errorEl: passwordError },
  }

  for (const err of errors) {
    const target = fieldMap[err.field]
    if (target) {
      showFieldError(target.input, target.errorEl, err.message)
    }
  }
}

/*
 Validation locale avant envoi à l'API.
 Ne remplace pas la validation backend (qui est la seule garantie de sécurité), mais améliore l'UX en donnant un retour immédiat.
*/
function validateForm() {
  let isValid = true

  if (!emailInput.value.trim()) {
    showFieldError(emailInput, emailError, "L'adresse email est requise.")
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    showFieldError(emailInput, emailError, "L'adresse email n'est pas valide.")
    isValid = false
  }

  if (!passwordInput.value) {
    showFieldError(passwordInput, passwordError, 'Le mot de passe est requis.')
    isValid = false
  }

  return isValid
}

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  clearFormMessages()

  if (!validateForm()) {
    const firstError = form.querySelector('[aria-invalid="true"]')
    if (firstError) firstError.focus()
    return
  }

  submitButton.disabled = true
  submitButton.textContent = 'Connexion en cours...'

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: emailInput.value.trim(),
        password: passwordInput.value,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      const params = new URLSearchParams({
        token: data.token.value,
        id: data.user.id,
        fullName: data.user.fullName,
        email: data.user.email,
      })
      window.location.href = `${FRONTEND_URL}/dashboard#${params.toString()}`
    } else if (response.status === 422 && Array.isArray(data.errors)) {
      applyApiValidationErrors(data.errors)
      const firstError = form.querySelector('[aria-invalid="true"]')
      if (firstError) firstError.focus()
    } else {
      formError.textContent = 'Email ou mot de passe incorrect.'
      formError.hidden = false
    }

  } catch {
    formError.textContent = 'Impossible de contacter le serveur. Vérifie ta connexion et réessaie.'
    formError.hidden = false
  } finally {
    submitButton.disabled = false
    submitButton.textContent = 'Se connecter'
  }
})