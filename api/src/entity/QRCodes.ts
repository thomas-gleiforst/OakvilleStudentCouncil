import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from "typeorm"
import {Events} from "./Events"

// TODO: Set column types of necessary (default in varchar255 or int)
// TODO: Determing if syntax for creating FK and PK out of same attribute is correct
@Entity()
export class QRCodes {

  @PrimaryColumn("smallint")
  pointValue!: Number;

  @OneToOne(() => Events)
  @PrimaryColumn()
  @JoinColumn()
  eventID!: Events;
}