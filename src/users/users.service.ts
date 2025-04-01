import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(user: CreateUserDto) {
    const { password, ...rest } = user;

    const existingUser = await this.prisma.user.findUnique({
      where: { email: rest.email },
    });

    if (existingUser) {
      throw new Error('El correo ya está registrado. Usa otro.');
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      return await this.prisma.user.create({
        data: { ...rest, password: hashedPassword },
      });
    } catch (error) {
      throw new Error('Error al crear el usuario.');
    }
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data: any = { ...updateUserDto };
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(updateUserDto.password, salt);
    }
    return this.prisma.user.update({
      where: { id },
      data: data,
      // select: {
      //   id: true,
      //   email: true,
      //   name: true,
      //   createdAt: true,
      //   updatedAt: true,
      // },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
