import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm'

@Entity()
export class Student {
  @PrimaryColumn('varchar', { length: 80 })
  email!: string

  // TypeORM hidden field so we get the password field only if needed
  @Column('varchar', { length: 1024, select: false })
  stuPass!: string

  @Column('varchar', { length: 80 })
  firstName!: string

  @Column('varchar', { length: 80, nullable: true })
  middleName!: string

  @Column('varchar', { length: 80 })
  lastName!: string

  @Column('timestamp')
  loginDate!: Date

  @CreateDateColumn()
  joinDate!: Date

  @Column('smallint')
  points!: number
}
