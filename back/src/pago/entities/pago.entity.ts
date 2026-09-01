import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Users } from '../../users/entities/user.entity';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Users, (user) => user.pagosRealizados)
  socio!: Users;

  @ManyToOne(() => Users, (user) => user.pagosRegistrados)
  registradoPor!: Users;

  @Column('float')
  monto!: number;

  @Column()
  periodo!: string; // ej: "2026-08"

  @CreateDateColumn()
  fechaPago!: Date;
}