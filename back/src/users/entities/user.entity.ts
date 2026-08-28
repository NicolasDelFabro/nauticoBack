import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pago } from '../../pago/entities/pago.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column({ unique: true })
  dni!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: true })
  active!: boolean;

  @Column()
  rol!: string;

  @OneToMany(() => Pago, (pago) => pago.socio)
  pagosRealizados!: Pago[];

  @OneToMany(() => Pago, (pago) => pago.registradoPor)
  pagosRegistrados!: Pago[];
}