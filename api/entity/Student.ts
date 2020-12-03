import { Column, Entity, PrimaryColumn } from "typeorm"

// TODO: Add loginDate and joinDate columns
// TODO: Set column types of necessary (default in varchar255 or int)
@Entity()
export class Student {

  @PrimaryColumn()
  email!: string;

  @Column()
  password!: string;

  @Column()
  firstName!: string;
  
  @Column()
  middleName!: string;


  @Column()
  lastName!: string;
}