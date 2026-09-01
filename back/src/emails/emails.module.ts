import { Module } from "@nestjs/common";
import { EmailService } from "./emails.service";

@Module({
    providers: [EmailService],
    exports: [EmailService],
})

export class EmailModule {}