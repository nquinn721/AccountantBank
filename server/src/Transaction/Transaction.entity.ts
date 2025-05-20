import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Player } from '../Players/Player.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => Player, (player) => player.transactions) player: Player;

  @Column() amount: number;

  @Column({ default: 'buyin' }) type: string; // 'buyin' | 'cashout'

  @Column({ default: 'cash' }) paytype: string; // 'cash' | 'venmo' | 'zelle' | 'paypal' | 'cashapp' | 'other'

  @Column({ default: '' }) notes: string;

  @Column({ default: false }) isSettled: boolean;

  @CreateDateColumn() created_at: Date;
}
