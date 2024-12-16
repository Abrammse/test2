import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typorm/user.entity';
import { CreateUserDto } from './dtos/createuser.dtos';
import { LoginUserDto } from './dtos/login.dtos ';
import { FindOneOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
@Injectable()

\export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepoaitory: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepoaitory.create({
      ...rest,
      password: hashedPassword,
    });

    return this.userRepoaitory.save(newUser);
  }

  async findUserByID(id: number) {
    const option: FindOneOptions<User> = { where: { id } };
    return this.userRepoaitory.findOne(option);
  }

  async login( loginUserDto:LoginUserDto) 
  \

  o
  
    const { password,emali } = loginUserDto;
  
    const user = await this.userRepository.findOne({
      where: { emali },
    });
  private ge

    
  }
  
}
