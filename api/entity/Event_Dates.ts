import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from "typeorm"
import { Events } from "./Events"

// TODO: Set column types of necessary (default in varchar255 or int)
@Entity()
export class Event_Dates {

  @PrimaryColumn("timestamp")
  eventDate!: Date;

  @OneToOne(() => Events)
  @JoinColumn()
  eventID!: Events; //this is foreign key referencing Events table
}