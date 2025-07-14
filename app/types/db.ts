export interface DB {
  users: {
    id: string;
    email: string;
    hashedPassword: string | null;
    createdAt: string;
    updatedAt: string;
  };
  sessions: {
    id: string;
    userId: string;
    expiresAt: string;
    createdAt: string;
  };
}