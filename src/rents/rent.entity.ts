import { Scooter } from '../scooters/scooter.entity';
import { User } from '../users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

export enum RentStatus {
  OnGoing = 'OnGoing',
  Finished = 'Finished',
}

@Entity()
export class Rent {
  @PrimaryGeneratedColumn()
  rentId: number;

  @Column()
  userId: number;

  @Column()
  scooterId: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  rentalStatus: RentStatus;

  @OneToOne(() => User)
  user: User;

  @OneToMany(() => Scooter, (scooter) => scooter.scooterId)
  scooter: Scooter;
}
