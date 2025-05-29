import { Tip } from 'src/Tip/Tip.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaction } from '../Transaction/Transaction.entity';
export interface IUser {
  id: number;
  name: string;
  isPlayer: boolean;
  isAdmin: boolean;
  isEmployee: boolean;
  transactions: Transaction[];
  moneyOwed?: number;
  totalBuyIn?: number;
  isCashedOut?: boolean;
}
@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column({ unique: true }) name: string;

  @Column({ default: false }) isPlayer: boolean;

  @Column({ default: false }) isAdmin: boolean;

  @Column({ default: false }) isEmployee: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @OneToMany(() => Tip, (tip) => tip.user)
  tips: Tip[];

  @CreateDateColumn() created_at: Date;
}
