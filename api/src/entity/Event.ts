import { Column, Entity, PrimaryGeneratedColumn, } from 'typeorm'
import { Attends } from './Attends'

// TODO: Set column types of necessary (default in varchar255 or int)
@Entity()
export class Event {
  @PrimaryGeneratedColumn("uuid")
  eventID!: number

  @Column('varchar', { length: 80 })
  eventName!: string

  @Column('varchar', { length: 2048 })
  event_desc!: string
}
