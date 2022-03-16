import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { EmailService } from './email.service';

@Controller('email')
@UseGuards(AuthGuard())
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post()
  sendMail(@GetUser() user: User, @Body('code') code: string) {
    return this.emailService.sendConfirmationEmail(user, code);
  }
}
