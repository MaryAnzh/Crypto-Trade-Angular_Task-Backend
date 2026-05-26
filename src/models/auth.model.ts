import { UserSafe } from "./user.model";

export type JwtPayload = {
    /** uuid  */
    sub: string;
    email: string;
}

export type AuthResponse = {
    accessToken: string;
    user: UserSafe;
}