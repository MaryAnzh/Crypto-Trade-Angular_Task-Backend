export interface User {
    /** uuid */
    id: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserSafe {
  id: string;
  email: string;
  createdAt: Date;
}