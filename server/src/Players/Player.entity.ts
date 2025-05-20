import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Transaction } from '../Transaction/Transaction.entity';
import { DealerTip } from 'src/DealerTips/DealerTip.entity';
@Entity()
export class Player {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @OneToMany(() => Transaction, (transaction) => transaction.player)
  transactions: Transaction[];

  @OneToMany(() => DealerTip, (tip) => tip.player)
  dealerTips: DealerTip[];

  @CreateDateColumn() created_at: Date;
}
