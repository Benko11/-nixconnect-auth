import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { VerifyUserDto } from './dto/verify-user.dto';
import { BCRYPT_PASSES, REPOSITORY } from 'src/constants';

@Injectable()
export class UsersService {
  constructor(@Inject(REPOSITORY) private usersRepository: typeof User) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll({
      attributes: ['nickname', 'createdAt'],
    });
  }

  async findByNickname(
    nickname: string,
    auth: boolean = true,
  ): Promise<User | undefined> {
    const attributes = auth
      ? ['id', 'nickname', 'password', 'createdAt']
      : ['nickname', 'createdAt'];
    return await this.usersRepository.findOne({
      where: { nickname },
      attributes,
    });
  }

  async findById(id: number): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      where: { id },
      attributes: ['nickname', 'createdAt'],
    });
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { nickname, password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, BCRYPT_PASSES);
    await User.sync();
    const newUser = User.build({ nickname, password: hashedPassword });
    await newUser.save();

    newUser.password = undefined;
    delete newUser.password;

    return newUser;
  }
}
