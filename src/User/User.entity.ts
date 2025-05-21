import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Transaction } from '../Transaction/Transaction.entity';
import { Tip } from 'src/Tip/Tip.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @Column({ default: false }) isPlayer: boolean;

  @Column({ default: false }) isAdmin: boolean;

  @Column({ default: false }) isEmployee: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @OneToMany(() => Tip, (tip) => tip.user)
  tips: Tip[];

  @CreateDateColumn() created_at: Date;
}
