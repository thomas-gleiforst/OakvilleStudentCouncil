import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from 'typeorm'
import { EventDate } from './EventDate'

@Entity()
export class Event {
  @PrimaryGeneratedColumn("uuid")
  eventID!: string

  @Column('varchar', { length: 80 })
  eventName!: string

  @Column('varchar', { length: 2048, nullable: true })
  event_desc!: string

  @OneToMany(() => EventDate, eventDate => eventDate.event)
  eventDate: EventDate[]
}
