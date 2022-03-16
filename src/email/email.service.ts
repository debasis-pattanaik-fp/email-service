import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { User } from '../auth/user.entity';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('email-queue') private mailQueue: Queue) {}
  async sendConfirmationEmail(user: User, code: string) {
    try {
      const result = await this.mailQueue.add('confirmation', {
        user,
        code,
      });
      return result;
    } catch (error) {
      return false;
    }
  }
}
