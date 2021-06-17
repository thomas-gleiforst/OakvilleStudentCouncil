import { Entity, ManyToOne } from 'typeorm'
import { Event } from './Event'
import { User } from './User'

@Entity()
export class Attends {
  @ManyToOne(() => User, (user: User) => user.id, {
    primary: true,
  })
  id!: User 

  @ManyToOne(() => Event, (event: Event) => event.id, {
    primary: true
  })
  eventID!: string
}
