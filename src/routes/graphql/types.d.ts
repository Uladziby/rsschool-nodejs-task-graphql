import { dataLoaders } from './loaders.ts';
import { UUID } from 'node:crypto';

export interface IPost {
  id: UUID;
  title: string;
  content: string;
  authorId: UUID;
}

export interface IContext {
  prisma: PrismaClient;
  loaders: ReturnType<typeof dataLoaders>;
}

export interface Member {
  id: `${MemberTypeId}`;
  discount: number;
  postLimitPerMonth: number;
}
