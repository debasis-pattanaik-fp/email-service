import { IsDate } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', { length: 250 })
  fullName: string;

  @Column('varchar', { length: 100 })
  password: string;

  @Column('varchar', { length: 100, unique: true })
  email: string;

  @Column('int', { width: 4 })
  countryCode: number;

  @Column('varchar', { length: 18 })
  mobileNumber: string;

  @Column('varchar', { length: 100 })
  company_name: string;

  @Column('int', { width: 11, nullable: true })
  createdBy: number;

  @Column('int', { width: 11, nullable: true })
  modifiedBy: number;

  @CreateDateColumn()
  @IsDate()
  createdOn?: Date;

  @UpdateDateColumn()
  @IsDate()
  modifiedOn?: Date;
}
