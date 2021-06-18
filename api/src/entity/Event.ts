import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"

import { EventDate } from "./EventDate"

@Entity()
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ type: "text" })
  name!: string

  @Column({ type: "text", nullable: true })
  description!: string

  @OneToMany(() => EventDate, (eventDate) => eventDate.event)
  dates!: EventDate[]
}
