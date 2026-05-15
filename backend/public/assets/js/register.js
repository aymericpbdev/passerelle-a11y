// public/assets/js/register.js
'use strict'

const API_BASE_URL = 'http://localhost:3333'

const form = document.getElementById('register-form')
const submitButton = form.querySelector('button[type="submit"]')
const formError = document.getElementById('form-error')

const fullNameInput = document.getElementById('fullName')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')

const fullNameError = document.getElementById('fullName-error')
const emailError = document.getElementById('email-error')
const passwordError = document.getElementById('password-error')

const fields = [
  { name: 'fullName', input: fullNameInput, errorEl: fullNameError },
  { name: 'email', input: emailInput, errorEl: emailError },
  { name: 'password', input: passwordInput, errorEl: passwordError },
]

/*
Réinitialise tous les états d'erreur du formulaire.
*/
function clearErrors() {
  formError.hidden = true
  formError.textContent = ''

  for (const field of fields) {
    field.input.removeAttribute('aria-invalid')
    field.errorEl.hidden = true
    field.errorEl.textContent = ''
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
  const fieldMap = Object.fromEntries(
    fields.map(f => [f.name, { input: f.input, errorEl: f.errorEl }])
  )

  for (const err of errors) {
    const target = fieldMap[err.field]
    if (target) {
      showFieldError(target.input, target.errorEl, err.message)
    }
  }
}

/*
Validation locale avant envoi à l'API.
*/
function validateForm() {
  let isValid = true

  if (!fullNameInput.value.trim() || fullNameInput.value.trim().length < 2) {
    showFieldError(fullNameInput, fullNameError, 'Le nom complet doit contenir au moins 2 caractères.')
    isValid = false
  }

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
  } else if (passwordInput.value.length < 8) {
    showFieldError(passwordInput, passwordError, 'Le mot de passe doit contenir au moins 8 caractères.')
    isValid = false
  }

  return isValid
}

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  clearErrors()

  if (!validateForm()) {
    const firstError = form.querySelector('[aria-invalid="true"]')
    if (firstError) firstError.focus()
    return
  }

  submitButton.disabled = true
  submitButton.textContent = 'Création en cours...'

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        fullName: fullNameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value,
      }),
    })

    const data = await response.json()

    if (response.status === 201) {
      window.location.href = '/login.html?registered=1'
    } else if (response.status === 409) {
      showFieldError(emailInput, emailError, 'Cette adresse email est déjà utilisée.')
      emailInput.focus()
    } else if (response.status === 422 && Array.isArray(data.errors)) {
      applyApiValidationErrors(data.errors)
      const firstError = form.querySelector('[aria-invalid="true"]')
      if (firstError) firstError.focus()
    } else {
      formError.textContent = 'Une erreur est survenue lors de la création du compte.'
      formError.hidden = false
    }

  } catch {
    formError.textContent = 'Impossible de contacter le serveur. Vérifie ta connexion et réessaie.'
    formError.hidden = false
  } finally {
    submitButton.disabled = false
    submitButton.textContent = 'Créer mon compte'
  }
})