import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn, } from "typeorm"
import {Events} from "./Events"

// TODO: Set column types of necessary (default in varchar255 or int)
// TODO: Determing if syntax for creating FK and PK out of same attribute is correct
@Entity()
export class Attends {

  @PrimaryColumn()
  email!: string;

  @ManyToOne(() => Events)
  @PrimaryColumn()
  @JoinColumn()
  eventID!: Events;
}