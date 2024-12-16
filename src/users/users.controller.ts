import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createuser.dtos';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { LoginUserDto } from './dtos/login.dtos ';
import { AuthGuard } from './dtos/auth.guard';

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({
    summary: 'user registeration ',
    description: 'The password of the user',
  })
  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'User has been successfully registered.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @UsePipes(ValidationPipe)
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }
  @ApiOperation({
    summary: 'user registeration ',
    description: 'The password of the user',
  })
  @ApiParam({ name: 'id', description: 'User ID', type: Number })
  @ApiResponse({ status: 200, description: 'User found successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @UseGuards(AuthGuard)
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUserByID(id);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
}
