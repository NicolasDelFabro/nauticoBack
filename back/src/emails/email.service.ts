// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_APP_PASSWORD'),
      },
    });
  }

  async enviarCodigoVerificacion(destinatario: string, codigo: string) {
    try {
      await this.transporter.sendMail({
        from: `"Club Náutico Pergamino" <${this.configService.get<string>('GMAIL_USER')}>`,
        to: destinatario,
        subject: 'Código de verificación',
        html: `
          <div>
            <h2>Tu código de verificación</h2>
            <p>Usá este código para cambiar tu contraseña:</p>
            <h1>${codigo}</h1>
            <p>Este código vence en 15 minutos.</p>
          </div>
        `,
      });
    } catch (error) {
      console.error('Error al enviar email:', error);
      throw new Error('No se pudo enviar el email de verificación');
    }
  }
}