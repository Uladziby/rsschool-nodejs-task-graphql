import { GraphQLFieldConfig, GraphQLList } from 'graphql';
import { ContextType } from '../prismaTypes.js';
import { UsersTypeGraphQL } from '../types/users.type.js';
import { UUIDType } from '../types/uuid.js';

type UsersQueriesType = {
  user: GraphQLFieldConfig<unknown, ContextType>;
  users: GraphQLFieldConfig<unknown, ContextType>;
};

export const UsersQueries: UsersQueriesType = {
  user: {
    type: UsersTypeGraphQL,
    args: { id: { type: UUIDType } },
    async resolve(_, { id }, context) {
      return context.prisma.user.findUnique({ where: { id } });
    },
  },
  users: {
    type: new GraphQLList(UsersTypeGraphQL),
    async resolve(_, __, context) {
      return context.prisma.user.findMany();
    },
  },
};
