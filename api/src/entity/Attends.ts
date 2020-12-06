import { Column, Entity, PrimaryColumn, ManyToOne, OneToMany, JoinColumn, } from "typeorm"
import {Events} from "./Events"
import {Student} from "./Student"

// TODO: Set column types of necessary (default in varchar255 or int)
// TODO: Determing if syntax for creating FK and PK out of same attribute is correct
@Entity()
export class Attends {

  @OneToMany(() => Student, (email: any) => email.email)
  @PrimaryColumn()
  email!: Student[];

  @ManyToOne(() => Events, (eventID: any) => eventID.eventID)
  @PrimaryColumn()
  eventID!: Events;
}