import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm'
import { Event } from './Event'

@Entity()
export class QRCodes {
  @PrimaryColumn('smallint')
  pointValue!: number

  @OneToOne(() => Event, { primary: true })
  @JoinColumn()
  eventID!: string
}
