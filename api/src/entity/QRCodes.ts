import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from "typeorm"
import {Event} from "./Event"

// TODO: Set column types of necessary (default in varchar255 or int)
@Entity()
export class QRCodes {

  @PrimaryColumn("smallint")
  pointValue!: Number;

  @OneToOne(() => Event)
  @PrimaryColumn()
  @JoinColumn()
  eventID!: string;
}