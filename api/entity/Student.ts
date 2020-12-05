import { Column, Entity, PrimaryColumn, ManyToOne, CreateDateColumn} from "typeorm"
import {Attends} from "./Attends"

// TODO: Set column types of necessary (default in varchar255 or int)
// TODO: Should loginDate() column be type @UpdateDateColumn?
@Entity()
export class Student {

  @PrimaryColumn("char", {length: 80})
  @ManyToOne(() => Student, (student: any) => student.email)
  email!: Attends;

  @Column("varchar", {length: 1024})
  stuPass!: string;

  @Column("char", {length: 80})
  firstName!: string;
  
  @Column("char", {length: 80})
  middleName!: string;

  @Column("char", {length: 80})
  lastName!: string;

  @Column("timestamp")
  loginDate!: Date;

  @CreateDateColumn("timestamp")
  joinDate!: Date;

  @Column("smallint")
  points!: Number;
}