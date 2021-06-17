import { Entity, PrimaryColumn, ManyToOne } from 'typeorm'
import { Event } from './Event'

@Entity()
export class EventDate {
  @PrimaryColumn('timestamptz')
  eventDate!: Date

  @ManyToOne(() => Event, (event: Event) => event.eventDate, {
    primary: true,
  })
  event!: Event
}
