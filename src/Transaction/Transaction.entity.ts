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

  @Column({ default: 0 }) cashOutPaid: number;

  @Column({ default: 'borrow' }) // 'borrow' | 'paid' | 'cashout'
  type: string;

  @Column({
    default: 'cash',
    // enum: ['cash', 'venmo', 'zelle', 'paypal', 'cashapp', 'other'],
  })
  paySource: string;

  @Column({ default: '' }) notes: string;

  @CreateDateColumn() created_at: Date;
}
