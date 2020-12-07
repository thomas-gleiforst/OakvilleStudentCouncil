import { Column, Entity, PrimaryColumn, ManyToOne } from "typeorm"
import { Event } from "./Event"

// TODO: Set column types of necessary (default in varchar255 or int)
@Entity()
export class EventDate {

  @PrimaryColumn("timestamp")
  eventDate!: Date;

  @ManyToOne(() => Event, (event: Event) => event.eventID)
  @PrimaryColumn()
  eventID!: string;
}