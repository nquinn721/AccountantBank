import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../User/User.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => User, (user) => user.transactions) user: User;

  @Column({ default: 0 }) amount: number;

  @Column({ default: 0 }) payOut: number;

  @Column({ default: 'buyin' }) type: string; // 'buyin' | 'cashout'

  @Column({ default: 'cash' }) paytype: string; // 'cash' | 'venmo' | 'zelle' | 'paypal' | 'cashapp' | 'other'

  @Column({ default: '' }) notes: string;

  @Column({ default: false }) isSettled: boolean;

  @CreateDateColumn() created_at: Date;
}
