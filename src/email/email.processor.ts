import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { plainToClass } from 'class-transformer';
import { User } from '../auth/user.entity';

@Processor('email-queue')
export class EmailProcessor {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  @OnQueueActive()
  onActive(job: Job) {
    Logger.log(
      `Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(
        job.data,
      )}`,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    Logger.log(
      `Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(
        result,
      )}`,
    );
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    Logger.error(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process('confirmation')
  async sendWelcomeEmail(job: Job<{ user: User; code: string }>): Promise<any> {
    Logger.log(`Sending confirmation email to '${job.data.user.email}'`);

    const url = `http://localhost:5000/api/v1/auth/${job.data.code}/confirm`;

    try {
      const result = await this.mailerService.sendMail({
        template: 'confirmation',
        context: {
          ...plainToClass(User, job.data.user),
          url: url,
        },
        subject: `Welcome to firstPrinciples,
        )}! Please Confirm Your Email Address`,
        to: job.data.user.email,
      });
      return result;
    } catch (error) {
      Logger.warn(
        `Failed to send confirmation email to '${job.data.user.email}'`,
        error.stack,
      );
    }
  }
}
