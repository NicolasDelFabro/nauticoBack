import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.pagosRealizados)
  socio!: User;

  @ManyToOne(() => User, (user) => user.pagosRegistrados)
  registradoPor!: User;

  @Column('float')
  monto!: number;

  @Column()
  periodo!: string; // ej: "2026-08"

  @CreateDateColumn()
  fechaPago!: Date;
}