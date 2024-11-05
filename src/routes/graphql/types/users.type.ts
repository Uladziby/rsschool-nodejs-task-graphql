import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileTypeGraphQL } from './profiles.type.js';
import { PostsTypeGraphQL } from './posts.type.js';
import { ContextType } from '../prismaTypes.js';
import { User } from '@prisma/client';
import { Context } from '../queries/member.js';

export const UsersTypeGraphQL: GraphQLObjectType<User, ContextType> =
  new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: UUIDType },
      name: { type: GraphQLString },
      balance: { type: GraphQLFloat },
      profile: {
        type: ProfileTypeGraphQL,
        resolve: async ({ id }: { id: string }, args, { prisma }: Context) => {
          return await prisma.profile.findUnique({
            where: {
              userId: id,
            },
          });
        },
      },
      posts: {
        type: new GraphQLList(PostsTypeGraphQL),
        resolve: async ({ id }: { id: string }, args, { prisma }: Context) => {
          return prisma.post.findMany({
            where: {
              authorId: id,
            },
          });
        },
      },
      userSubscribedTo: {
        type: new GraphQLList(UsersTypeGraphQL),
        resolve: async ({ id }: { id: string }, args, { prisma }: Context) => {
          return await prisma.user.findMany({
            where: {
              subscribedToUser: {
                some: {
                  subscriberId: id,
                },
              },
            },
          });
        },
      },
      subscribedToUser: {
        type: new GraphQLList(UsersTypeGraphQL),
        resolve: async ({ id }: { id: string }, args, { prisma }: Context) => {
          return await prisma.user.findMany({
            where: {
              userSubscribedTo: {
                some: {
                  authorId: id,
                },
              },
            },
          });
        },
      },
    }),
  });
