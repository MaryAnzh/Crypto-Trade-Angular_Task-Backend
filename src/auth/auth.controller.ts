import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import * as C from '../constants';

import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./guards/jwt.guard";

const { AUTH, REGISTER, LOGIN, CURRENT_USER } = C.ROUTES;

@ApiTags(AUTH)
@Controller(AUTH)
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post(REGISTER)
    @ApiOperation({ summary: 'Register new user' })
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post(LOGIN)
    @ApiOperation({ summary: 'Login user' })
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Get(CURRENT_USER)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get current user' })
    me(@Req() req) {
        return this.authService.me(req.user.id);
    }
}