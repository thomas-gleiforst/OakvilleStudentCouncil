import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'


// TODO: Set column types of necessary (default in varchar255 or int)
// TODO: Should loginDate() column be type @UpdateDateColumn?
@Entity()
export class Student {
  @PrimaryColumn('varchar', { length: 80 })
  email!: string

  @Column('varchar', { length: 1024 })
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
