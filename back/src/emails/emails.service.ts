import { Injectable } from "@nestjs/common";
import { Resend } from "resend";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmailService {
    private resend: Resend;

    constructor(private ConfigService: ConfigService) {
        this.resend = new Resend(this.ConfigService.get<string>('RESEND_API_KEY'));
    }

    async send(destinatario: string, asunto: string, html: string) {
        return this.resend.emails.send({
            from: 'Club Náutico Pergamino <cnp.salon@gmail.com>',
            to: destinatario,
            subject: asunto,
            html,
        });
    }
}