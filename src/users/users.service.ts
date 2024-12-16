import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typorm/user.entity';
import { CreateUserDto } from './dtos/createuser.dtos';
import { LoginUserDto } from './dtos/login.dtos ';
import { FindOneOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = this.userRepository.create({
      ...rest,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  async findUserByID(id: number) {
    const options: FindOneOptions<User> = { where: { id } };
    const user = await this.userRepository.findOne(options);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    // Find user by email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    // Generate JWT
    const token = this.generateJwtToken(
      email,
      user.id,
      password,
      `${user.firstName} ${user.lastName}`,
    );

    return { token };
  }

  private generateJwtToken(
    email: string,
    userID: number,
    name: string,
    password: string,
  ): string {
    const payload = { email, name, userID, password };
    const secretKey = this.configService.get('JWT_SECRET');
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secretKey, options);
  }
}
