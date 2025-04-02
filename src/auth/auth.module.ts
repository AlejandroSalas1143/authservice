import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { EncoderService } from './encoder.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: '2f7a8e9d0a5d3b8c61c5e7d12e9c8a7f7b6c5e8d7a9b0c6d5e8a9b7c0d6e8a7f', //ESTO SE DEBERIA IMPORTAR DE UN ARCHIVO .ENV
      signOptions: {
        expiresIn: 3600,
      },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, EncoderService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
