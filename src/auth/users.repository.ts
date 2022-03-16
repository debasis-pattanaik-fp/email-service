import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as Bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const {
      fullName,
      email,
      password,
      company_name,
      countryCode,
      createdBy,
      modifiedBy,
      mobileNumber,
    } = authCredentialsDto;
    const hashedPassword = await Bcrypt.hash(password, 10);
    const user = this.create({
      email,
      fullName,
      password: hashedPassword,
      company_name,
      countryCode,
      createdBy,
      modifiedBy,
      mobileNumber,
    });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate email
        throw new ConflictException(`email: ${email} already exists`);
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
