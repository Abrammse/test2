import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
    name: 'first_name',
    default: '',
  })
  firstName: string;

  @Column({
    nullable: false,
    name: 'last_name',
    default: '',
  })
  lastName: string;
  @Column({
    nullable: false,
    name: 'email',
    default: '',
  })
  email: string;

  @Column({
    nullable: false,
    name: 'password',
  })
  password: string;
}
