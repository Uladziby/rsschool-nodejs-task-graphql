import { GraphQLList, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { ProfileTypeGraphQL } from '../types/profiles.type.js';
import { Context } from './member.js';

export const ProfileQueries = {
  profile: {
    type: ProfileTypeGraphQL,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (_, { id }, { prisma }: Context) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return prisma.profile.findUnique({ where: { id } });
    },
  },
  profiles: {
    type: new GraphQLList(ProfileTypeGraphQL),
    resolve: async (_, __, { prisma }: Context) => {
      return prisma.profile.findMany();
    },
  },
};
