import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { User } from '@prisma/client';
import { UserSafe, UserUpdatePasswordType } from '../models';
import { PrismaService } from '../prismaService/prisma.service';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './dto/updateUser.dto';

import * as C from '../constants';
import { UpdatePassDto } from './dto/updatePass.dto';

@Injectable()
export class UserService {
    private CRYPT_SALT: number;

    constructor(
        private prisma: PrismaService,
        private config: ConfigService) {
        this.CRYPT_SALT = Number(this.config.get<number>('CRYPT_SALT', 10));
    }

    safeUser(user: User): UserSafe {
        const { id, email, createdAt } = user;
        return { id, email, createdAt, name: user.name ?? null, avatarUrl: user.avatarUrl ?? null };
    }

    async getUser(user: User): Promise<UserSafe> {
        return this.safeUser(user);
    }

    async updateUser(id: string, dto: UpdateUserDto): Promise<UserSafe> {
        try {
            const updated = await this.prisma.user.update({
                where: { id },
                data: { ...dto },
            });

            return this.safeUser(updated);
        } catch {
            throw new NotFoundException(C.USER_NOT_FOUND);
        }
    }

    async updatePassword({ id, passwordHash }: User, dto: UserUpdatePasswordType): Promise<UserSafe> {
        const user = await this.prisma.user.findUnique({ where: { id } });

        const isValid = await bcrypt.compare(dto.oldPassword, passwordHash);
        if (!isValid) throw new UnauthorizedException(C.WRONG_PASSWORD);

        return this.prisma.user.update({
            where: { id },
            data: { passwordHash: await bcrypt.hash(dto.newPassword, 10) },
        });
    }
}
