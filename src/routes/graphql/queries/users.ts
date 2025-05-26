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
import {
  ResolveTree,
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType as simplifyResolve,
} from 'graphql-parse-resolve-info';
import { IContext } from '../types.js';

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
    async resolve(_, __, context, data) {
      const resolveInfo = simplifyResolve(
        parseResolveInfo(data) as ResolveTree,
        new GraphQLList(UsersTypeGraphQL),
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const users = await context.prisma.user.findMany({
        include: {
          userSubscribedTo: Boolean(resolveInfo.fields['userSubscribedTo']),
          subscribedToUser: Boolean(resolveInfo.fields['subscribedToUser']),
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      users.forEach((user) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        context.loaders.userById.prime(user.id as UUID, user);
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return users;
    },
  },
} satisfies {
  user: GraphQLFieldConfig<void, IContext, { id: UUID }>;
  users: GraphQLFieldConfig<void, IContext>;
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
