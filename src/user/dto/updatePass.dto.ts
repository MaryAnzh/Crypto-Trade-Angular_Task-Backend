import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdatePassDto<UserUpdatePasswordType> {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    oldPassword!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    newPassword!: string;
}