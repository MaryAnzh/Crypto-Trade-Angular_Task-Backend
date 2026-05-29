import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserSafe } from '../models';
import { PrismaService } from '../prismaService/prisma.service';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './dto/updateUser.dto';

import * as C from '../constants';

@Injectable()
export class UserService {

    constructor(
        private prisma: PrismaService,
        private config: ConfigService) { }

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
}
