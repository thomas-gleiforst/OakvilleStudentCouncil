import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class User {
  @PrimaryColumn()
  id!: string

  @Column({ type: "text", unique: true })
  email!: string

  @Column({ type: "text" })
  firstName!: string

  @Column({ type: "text", nullable: true })
  middleName!: string | null

  @Column({ type: "text" })
  lastName!: string

  @CreateDateColumn()
  joinDate!: Date

  @Column("smallint")
  points!: number

  @Column({ type: "text" })
  role!: string
}
