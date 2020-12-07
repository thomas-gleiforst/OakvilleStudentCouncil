import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { Attends } from './Attends'

// TODO: Set column types of necessary (default in varchar255 or int)
@Entity()
export class Event {
  @PrimaryColumn('smallint')
  eventID!: number

  @Column('char', { length: 80 })
  eventName!: string

  @Column('varchar', { length: 2048 })
  event_desc!: string
}
