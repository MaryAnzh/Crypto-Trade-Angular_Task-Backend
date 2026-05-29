import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name!: string;
}