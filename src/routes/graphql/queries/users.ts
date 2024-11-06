import { GraphQLBoolean, GraphQLFieldConfig, GraphQLList } from 'graphql';
import {
  ChangeUserInput,
  CreateUserInput,
  UsersTypeGraphQL,
} from '../types/users.type.js';
import { UUIDType } from '../types/uuid.js';
import { Context } from './member.js';
import { User } from '@prisma/client';
import { UUID } from 'crypto';

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

export const UsersMutation = {
  createUser: {
    type: UsersTypeGraphQL,
    args: { dto: { type: CreateUserInput } },
    async resolve(_, { dto }, { prisma }: Context) {
      return prisma.user.create({ data: dto });
    },
  },
  changeUser: {
    type: UsersTypeGraphQL,
    args: {
      id: { type: UUIDType },
      dto: { type: ChangeUserInput },
    },
    async resolve(_, { id, dto }, { prisma }: Context) {
      return prisma.user.update({ where: { id }, data: dto });
    },
  },
  deleteUser: {
    type: GraphQLBoolean,
    args: { id: { type: UUIDType } },
    async resolve(_, { id }, { prisma }: Context) {
      await prisma.user.delete({ where: { id } });
      return true;
    },
  },
} satisfies {
  createUser: GraphQLFieldConfig<void, Context, { dto: User }>;
  changeUser: GraphQLFieldConfig<void, Context, { id: UUID; dto: User }>;
  deleteUser: GraphQLFieldConfig<void, Context, { id: UUID }>;
};
