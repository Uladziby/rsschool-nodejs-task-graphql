import { GraphQLList } from 'graphql';
import { UsersTypeGraphQL } from '../types/users.type.js';
import { UUIDType } from '../types/uuid.js';
import { Context } from './member.js';

export const UsersQueries = {
  user: {
    type: UsersTypeGraphQL,
    args: { id: { type: UUIDType } },
    async resolve(_, { id }, { prisma }: Context) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return prisma.user.findUnique({ where: { id } });
    },
  },
  users: {
    type: new GraphQLList(UsersTypeGraphQL),
    async resolve(_, __, { prisma }: Context) {
      return prisma.user.findMany();
    },
  },
};
