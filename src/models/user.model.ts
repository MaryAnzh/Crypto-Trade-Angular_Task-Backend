

import type { User as UserType } from "@prisma/client";

export type User = UserType;

export type UserSafe = Omit<User, 'passwordHash' | 'updatedAt'>