import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm'
import { Event } from './Event'

// TODO: Set column types of necessary (default in varchar255 or int)
@Entity()
export class Locations {
  @Column()
  name!: string

  @Column()
  address!: string

  @Column('smallint')
  room!: Number

  @OneToOne(() => Event, { primary: true })
  @JoinColumn()
  eventID!: string
}
