import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Project from '#models/project'
import Issue from '#models/issue'

export default class Audit extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare projectId: number

  @column()
  declare score: number | null

  @column()
  declare rawData: Record<string, unknown> | null

  @column.dateTime()
  declare testedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  @hasMany(() => Issue)
  declare issues: HasMany<typeof Issue>
}
