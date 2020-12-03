import { Column, Entity, PrimaryColumn } from "typeorm"

// TODO: Set column types of necessary (default in varchar255 or int)
@Entity()
export class Events {

  @PrimaryColumn("smallint")
  eventID!: Number;

  @Column("char", {length : 80})
  eventName!: string;

  @Column("varchar", {length: 2048})
  event_desc!: string;
}