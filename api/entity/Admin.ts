import { Column, Entity, PrimaryColumn, CreateDateColumn } from "typeorm"

// TODO: Set column types of necessary (default in varchar255 or int)
// TODO: Should loginDate() column be type @UpdateDateColumn?
@Entity()
export class Admin {

  @PrimaryColumn("char", {length: 80})
  email!: string;

  @Column("varchar", {length: 1024})
  adminPass!: string;

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
}