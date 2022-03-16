import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config/config.schema';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./src/config/config.env'],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRoot(config),

    AuthModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
