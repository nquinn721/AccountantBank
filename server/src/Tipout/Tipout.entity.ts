import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Tipout {
  @PrimaryGeneratedColumn() id: number;

  @Column() amount: number;

  @Column({ default: '' }) notes: string;

  @CreateDateColumn() created_at: Date;
}
