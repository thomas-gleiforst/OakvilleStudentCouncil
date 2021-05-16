import { Column, Entity, PrimaryColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Admin {

  @PrimaryColumn("varchar", {length: 80})
  email!: string;

  // TypeORM hidden field so we get the password field only if needed
  @Column("varchar", {length: 1024, select: false})
  adminPass!: string;

  @Column("varchar", {length: 80})
  firstName!: string;
  
  @Column("varchar", {length: 80, nullable: true})
  middleName!: string;

  @Column("varchar", {length: 80})
  lastName!: string;

  @Column("timestamp")
  loginDate!: Date;

  @CreateDateColumn()
  joinDate!: Date;
}