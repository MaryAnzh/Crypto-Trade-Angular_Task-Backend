import { Body, Controller, Get, HttpCode, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import * as C from '../constants';

import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { StatusCodes as SC } from 'http-status-codes';
import { User as UserDecorator } from "./decorators/user.decorator";
import type { User } from "@prisma/client";
import { Public } from "./decorators/public.decorator";

const { AUTH, REGISTER, LOGIN, CURRENT_USER } = C.ROUTES;

@ApiTags(AUTH)
@Controller(AUTH)
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(SC.CREATED)
    @ApiOperation({ summary: 'Register new user' })
    @ApiResponse({
        status: SC.CREATED, // 201
        description: 'Successful registration',
        schema: {
            example: {
                accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
        },
    })
    @ApiResponse({ status: SC.BAD_REQUEST, description: 'Invalid data' })
    @Public()
    @Post(REGISTER)
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @HttpCode(SC.OK) // 200
    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({
        status: SC.OK,
        description: 'Successful login',
        schema: {
            example: {
                accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
        },
    })
    @Public()
    @Post(LOGIN)
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get current user' })
    @ApiResponse({
        status: SC.OK,
        description: 'Current user info',
        schema: {
            example: {
                id: 'c1a2b3c4-d5e6-7890-abcd-1234567890ef',
                email: 'user@mail.com',
                createdAt: '2026-05-24T16:20:00.000Z',
            },
        },
    })
    @Get(CURRENT_USER)
    me(@UserDecorator() user: User) {
        return this.authService.me(user);
    }
}