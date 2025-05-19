import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from '../Transaction/Transaction.entity';
@Entity()
export class Player {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;
  @OneToMany(() => Transaction, (transaction) => transaction.player)
  transactions: Transaction[];
}
