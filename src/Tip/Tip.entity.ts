import { User } from 'src/User/User.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Tip {
  @PrimaryGeneratedColumn() id: number;

  @Column() amount: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ default: '' }) notes: string;

  @CreateDateColumn() created_at: Date;
}
