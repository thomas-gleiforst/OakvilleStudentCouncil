import { Column, Entity, PrimaryColumn, ManyToOne } from 'typeorm'
import { Event } from './Event'

@Entity()
export class EventDate {
  @PrimaryColumn('timestamp')
  eventDate!: Date

  @ManyToOne(() => Event, (event: Event) => event.eventDate, {
    primary: true,
  })
  event!: Event
}
