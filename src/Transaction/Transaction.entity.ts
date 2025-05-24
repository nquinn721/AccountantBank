import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../User/User.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => User, (user) => user.transactions) user: User;

  @Column({ default: 0 }) amount: number;

  @Column({ default: 0 }) payOut: number;

  @Column({ default: 'buyin' }) type: string; // 'buyin' | 'cashout'

  @Column({
    default: 'cash',
    enum: ['cash', 'venmo', 'zelle', 'paypal', 'cashapp', 'other'],
  })
  paytype: string;

  @Column({ default: '' }) notes: string;

  @Column({ default: false }) isSettled: boolean;

  @CreateDateColumn() created_at: Date;
}
