

import type { User as UserType } from "@prisma/client";

export type User = UserType;

export type UserSafe = Omit<User, 'passwordHash' | 'updatedAt'>

export type UserUpdateType = Partial<Pick<User, 'name'>>;
export type UserUpdatePasswordType = { oldPassword: string, newPassword: string };
export type UserUpdateAvatarType = { avatarUrl: string };