import { GraphQLBoolean, GraphQLFieldConfig } from 'graphql';
import { UUIDType } from './types/uuid.js';
import { UUID } from 'crypto';
import { Context } from './queries/member.js';

export type SubscribeType = {
  userId: UUID;
  authorId: UUID;
};

export const SubscribeMutations = {
  subscribeTo: {
    type: GraphQLBoolean,
    args: {
      userId: { type: UUIDType },
      authorId: { type: UUIDType },
    },
    async resolve(_, { userId, authorId }, { prisma }: Context) {
      try {
        await prisma.user.update({
          where: { id: userId },
          data: { userSubscribedTo: { create: { authorId } } },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
  },
  unsubscribeFrom: {
    type: GraphQLBoolean,
    args: {
      userId: { type: UUIDType },
      authorId: { type: UUIDType },
    },
    async resolve(_, { userId, authorId }, { prisma }: Context) {
      try {
        await prisma.subscribersOnAuthors.deleteMany({
          where: {
            subscriberId: userId,
            authorId,
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
} satisfies {
  subscribeTo: GraphQLFieldConfig<void, Context, SubscribeType>;
  unsubscribeFrom: GraphQLFieldConfig<void, Context, SubscribeType>;
};
