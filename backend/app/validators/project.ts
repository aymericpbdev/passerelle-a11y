// app/validators/project.ts

import vine from '@vinejs/vine'

export const createProjectValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(255),
    url: vine.string().trim().url().maxLength(2048),
  })
)
