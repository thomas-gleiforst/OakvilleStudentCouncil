import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from 'typeorm'

import { Attends } from './Attends'
import { EventDate } from './EventDate'

// TODO: Set column types of necessary (default in varchar255 or int)
@Entity()
export class Event {
  @PrimaryGeneratedColumn("uuid")
  eventID!: string

  @Column('varchar', { length: 80 })
  eventName!: string

  @Column('varchar', { length: 2048 })
  event_desc!: string

  @OneToMany(() => EventDate, eventDate => eventDate.event)
  eventDate: EventDate
}
