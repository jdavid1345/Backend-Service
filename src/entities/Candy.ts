import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Candy {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("text")
  description!: string;

  @Column("decimal")
  price!: number;
}