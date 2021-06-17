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

  @Column({ type: "text", length: 80 })
  name!: string

  @Column({ type: "text", length: 2048, nullable: true })
  description!: string

  @OneToMany(() => EventDate, (eventDate) => eventDate.event)
  dates!: EventDate[]
}
