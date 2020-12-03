import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from "typeorm"
import {Events} from "./Events"

// TODO: Set column types of necessary (default in varchar255 or int)
// TODO: Determing if syntax for creating FK and PK out of same attribute is correct
@Entity()
export class Locations {

  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column("smallint")
  room!: Number;

  @OneToOne(() => Events)
  @PrimaryColumn()
  @JoinColumn()
  eventID!: Events;
}