import { Entity, PrimaryColumn, ManyToOne } from 'typeorm'
import { Event } from './Event'
import { Student } from './Student'

// TODO: Set column types of necessary (default in varchar255 or int)
// TODO: Determing if syntax for creating FK and PK out of same attribute is correct
@Entity()
export class Attends {
  @ManyToOne(() => Student, (student: Student) => student.email, {
    primary: true,
  })
  //@PrimaryColumn()
  email!: Student

  @ManyToOne(() => Event, (event: Event) => event.eventID)
  @PrimaryColumn()
  eventID!: string
}
