import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm'
import { Event } from './Event'

// TODO: Set column types of necessary (default in varchar255 or int)
@Entity()
export class Locations {
  @Column('varchar', {length: 255})
  name!: string

  @Column('varchar', {length: 255})
  address!: string

  @Column('smallint')
  room!: number

  @OneToOne(() => Event, { primary: true })
  @JoinColumn()
  eventID!: string
}
