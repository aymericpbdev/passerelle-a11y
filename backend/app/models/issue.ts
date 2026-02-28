import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Audit from '#models/audit'

export default class Issue extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare auditId: number

  @column()
  declare type: string

  @column()
  declare severity: string

  @column()
  declare element: string

  @column()
  declare description: string

  @column()
  declare recommendation: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Audit)
  declare audit: BelongsTo<typeof Audit>
}
