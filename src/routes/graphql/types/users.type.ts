import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileTypeGraphQL } from './profiles.type.js';
import { PostsTypeGraphQL } from './posts.type.js';
import { ContextType } from '../prismaTypes.js';
import { User } from '@prisma/client';

export const UsersTypeGraphQL: GraphQLObjectType<User, ContextType> =
  new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: new GraphQLNonNull(UUIDType) },
      name: { type: GraphQLString },
      balance: { type: GraphQLFloat },
      profile: { type: ProfileTypeGraphQL },
      posts: { type: new GraphQLList(PostsTypeGraphQL) },
      userSubscribedTo: {
        type: new GraphQLList(UsersTypeGraphQL),
        resolve: async (src, _, context) => {
          const res = context.prisma.subscribersOnAuthors.findMany({
            where: { subscriberId: src.id },
            select: { authorId: true },
          });
          return (await res).map((el) => el.authorId);
        },
      },
      subscribedToUser: {
        type: new GraphQLList(UsersTypeGraphQL),
        resolve: async (src, _, context) => {
          const res = await context.prisma.subscribersOnAuthors.findMany({
            where: {
              authorId: src.id,
            },
            select: {
              subscriber: true,
            },
          });
          return res.map((result) => result.subscriber);
        },
      },
    }),
  });
