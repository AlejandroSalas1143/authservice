import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() loginDto: loginDto) {
    return this.authService.create(loginDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') email: string) {
  //   return this.authService.findOne(email);
  // }
  @Post('login')
  findOne(@Body() loginDto: loginDto) {
    return this.authService.login(loginDto);
  }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
