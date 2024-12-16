import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createuser.dtos';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('users')
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
  @Get(':id')
  @ApiParam({ name: 'ID', description: 'User ID', type: Number })
  @ApiResponse({ status: 200, description: 'User retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid user ID.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findUserByID(@Param('id', ParseIntPipe) id: string) {
    return this.userService.findUserByID(+id);
  }
}
