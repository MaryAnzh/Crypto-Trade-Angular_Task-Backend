import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateAvatarDto<UserUpdateAvatarType> {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    avatarUrl!: string;
}