/* eslint-disable @typescript-eslint/no-unsafe-call */
import { GraphQLList } from 'graphql';
import { MemberTypeIdGql, MemberTypesQueries } from './types/member-types.type.js';

export const queries = {
  memberType: {
    type: MemberTypesQueries,
    args: { id: { type: MemberTypeIdGql } },
    async resolve(__, { id }, context) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      return context.prisma.memberType.findUnique({ where: { id } });
    },
  },
  memberTypes: {
    type: new GraphQLList(MemberTypesQueries),
    async resolve(__, _, context) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return context.prisma.memberType.findMany();
    },
  },
};

//...MemberTypeQueries,
//...PostsTypeQueries,
//...ProfilesTypeQueries,
//...UsersTypeQueries,
//...StatsTypeQueries,
