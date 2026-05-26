import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prismaService/prisma.service";
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { User } from "@prisma/client";

import * as C from '../constants';
import type { AuthResponse, JwtPayload, UserSafe } from "../models";

import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
    private CRYPT_SALT: number;

    constructor(
        private prisma: PrismaService,
        private config: ConfigService,
        private jwt: JwtService,
    ) {
        this.CRYPT_SALT = Number(this.config.get<number>('CRYPT_SALT', 10));
    }

    safeUser(user: User): UserSafe {
        const { id, email, createdAt } = user;
        return { id, email, createdAt, name: user.name ?? undefined };
    }

    async register(dto: RegisterDto): Promise<AuthResponse> {
        const exists = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (exists) {
            throw new BadRequestException(C.MAIL_EXIST);
        }

        const passwordHash = await bcrypt.hash(dto.password, this.CRYPT_SALT);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                passwordHash,
                name: dto.name ?? null,
            },
        });

        return ({
            accessToken: this.generateToken(user).accessToken,
            user: this.safeUser(user)
        });
    }

    async login(dto: LoginDto): Promise<AuthResponse> {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (!user) {
            throw new UnauthorizedException(C.INVALID_MAIL);
        }

        const valid = await bcrypt.compare(dto.password, user.passwordHash);

        if (!valid) {
            throw new UnauthorizedException(C.INVALID_PASS);
        }

        return ({
            accessToken: this.generateToken(user).accessToken,
            user: this.safeUser(user)
        });
    }

    async me(user: User): Promise<UserSafe> {
        return {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
        };
    }

    private generateToken(user: User) {
        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
        };

        return {
            accessToken: this.jwt.sign(payload),
        };
    }
}