import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export enum ScooterStatus {
  Available = 'Available',
  Rented = 'Rented',
}

@Entity()
export class Scooter {
  @PrimaryGeneratedColumn()
  scooterId: number;

  @Column()
  firstName: string;

  @Column()
  scooterName: string;

  @Column()
  status: ScooterStatus;

  @Column()
  lastRentedTime: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
