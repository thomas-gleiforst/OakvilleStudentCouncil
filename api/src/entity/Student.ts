import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class Student {
  @PrimaryColumn("varchar", { length: 80 })
  email!: string

  @Column("varchar", { unique: true })
  id!: string

  @Column("varchar", { length: 80 })
  firstName!: string

  @Column({ type: "varchar", length: 80, nullable: true })
  middleName!: string | null

  @Column("varchar", { length: 80 })
  lastName!: string

  @Column("timestamp")
  loginDate!: Date

  @CreateDateColumn()
  joinDate!: Date

  @Column("smallint")
  points!: number
}
