import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserSafe } from '../models';
import { PrismaService } from '../prismaService/prisma.service';
import { ConfigService } from '@nestjs/config';

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
}
