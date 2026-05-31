import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatusCodes as SC } from 'http-status-codes';

import * as C from '../constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserService } from './user.service';
import { User } from '../auth/decorators/user.decorator';
import type { User as UserType } from '@prisma/client';
import { UpdateUserDto } from './dto/updateUser.dto';

@ApiTags(C.ROUTES.USER)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller(C.USER)
@Controller(C.USER)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Get current user' })
    @Get()
    getMe(@User() user: UserType) {
        return this.userService.getUser(user);
    }

    @ApiOperation({ summary: 'Update current user' })
    @ApiBody({
        description: 'User fields to update',
        type: UpdateUserDto,
    })
    @ApiResponse({
        status: SC.OK,
        description: 'User updated successfully',
    })
    @ApiResponse({
        status: SC.NOT_FOUND,
        description: 'User not found',
    })
    @Put()
    update(@User() { id }, @Body() dto: UpdateUserDto) {
        return this.userService.updateUser(id, dto);
    }
}
