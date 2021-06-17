import { Entity, PrimaryColumn, ManyToOne, Column } from 'typeorm'
import { Event } from './Event'

@Entity()
export class EventDate {
  @PrimaryColumn('timestamptz')
  eventDate!: Date

  @Column({type: "text", nullable: true})
  address!: string | null

  @Column({type: "text"})
  room!: string

  @ManyToOne(() => Event, (event: Event) => event.dates, {
    primary: true,
  })
  event!: Event
}
