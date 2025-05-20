import { Player } from 'src/Players/Player.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class DealerTip {
  @PrimaryGeneratedColumn() id: number;

  @Column() amount: number;

  @ManyToOne(() => Player, (player) => player.id)
  player: Player;

  @Column({ default: '' }) notes: string;

  @CreateDateColumn() created_at: Date;
}
