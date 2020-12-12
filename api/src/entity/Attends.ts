import { Entity, PrimaryColumn, ManyToOne } from 'typeorm'
import { Event } from './Event'
import { Student } from './Student'

@Entity()
export class Attends {
  @ManyToOne(() => Student, (student: Student) => student.email, {
    primary: true,
  })
  email!: Student

  @ManyToOne(() => Event, (event: Event) => event.eventID, {
    primary: true
  })
  eventID!: string
}
