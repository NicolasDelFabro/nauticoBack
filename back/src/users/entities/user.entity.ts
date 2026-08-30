import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Timestamp } from 'typeorm';
import { Pago } from '../../pago/entities/pago.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true})
  name: string;

  @Column({ unique: true})
  dni: Number

  @Column()
  birthdate: String;

  @Column()
  address: String;

  @Column()
  phone: String;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: true })
  active!: boolean;

  @Column()
  rol!: string;

  @Column({ type: 'varchar', nullable: true})
  verificationCode: string | null;

  @Column({ type: 'timestamp', nullable: true})
  verificationCodeExpiresAt: Date | null;

  @OneToMany(() => Pago, (pago) => pago.socio)
  pagosRealizados!: Pago[];

  @OneToMany(() => Pago, (pago) => pago.registradoPor)
  pagosRegistrados!: Pago[];
}