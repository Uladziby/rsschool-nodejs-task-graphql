import { PrismaClient } from '@prisma/client';

export type MemberType = {
  id: string;
  discount: number;
  postLimitPerMonth: number;
};

export type ContextType = {
  prisma: PrismaClient;
};
