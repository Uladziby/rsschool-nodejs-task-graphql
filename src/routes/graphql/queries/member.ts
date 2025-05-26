import { GraphQLFieldConfig, GraphQLList } from 'graphql';
import { MemberTypeIdGql, MemberType } from '../types/member.type.js';
import { UUID } from 'crypto';
import { PrismaClient } from '@prisma/client';
import { IContext } from '../types.js';

export type Context = {
  prisma: PrismaClient;
};

export const MemberTypeQueries = {
  memberType: {
    type: MemberType,
    args: { id: { type: MemberTypeIdGql } },
    async resolve(__, { id }, context: IContext) {
      return context.loaders.memberType.load(id);
    },
  },
  memberTypes: {
    type: new GraphQLList(MemberType),
    async resolve(__, _, context) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return context.prisma.memberType.findMany();
    },
  },
} satisfies {
  memberType: GraphQLFieldConfig<void, IContext, { id: UUID }>;
  memberTypes: GraphQLFieldConfig<void, IContext>;
};
