import { GraphQLFieldConfig, GraphQLList } from 'graphql';
import { MemberTypeIdGql, MemberType } from '../types/member.type.js';
import { PrismaClient } from '@prisma/client';
import { UUID } from 'crypto';

export type Context = {
  prisma: PrismaClient;
};

export const MemberTypeQueries = {
  memberType: {
    type: MemberType,
    args: { id: { type: MemberTypeIdGql } },
    async resolve(__, { id }, { prisma }: Context) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return prisma.memberType.findUnique({ where: { id } });
    },
  },
  memberTypes: {
    type: new GraphQLList(MemberType),
    async resolve(__, _, { prisma }: Context) {
      return prisma.memberType.findMany();
    },
  },
} satisfies {
  memberType: GraphQLFieldConfig<void, Context, { id: UUID }>;
  memberTypes: GraphQLFieldConfig<void, Context>;
};
