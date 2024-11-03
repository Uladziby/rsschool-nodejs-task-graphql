import { GraphQLFieldConfig, GraphQLList } from 'graphql';
import { MemberTypeIdGql, MemberTypesQueries } from '../types/member-types.type.js';
import { ContextType } from '../prismaTypes.js';

type MemberTypeQueriesType = {
  memberType: GraphQLFieldConfig<unknown, ContextType>;
  memberTypes: GraphQLFieldConfig<unknown, ContextType>;
};

export const MemberTypeQueries: MemberTypeQueriesType = {
  memberType: {
    type: MemberTypesQueries,
    args: { id: { type: MemberTypeIdGql } },
    async resolve(__, { id }, context) {
      return context.prisma.memberType.findUnique({ where: { id } });
    },
  },
  memberTypes: {
    type: new GraphQLList(MemberTypesQueries),
    async resolve(__, _, context) {
      return context.prisma.memberType.findMany();
    },
  },
};
