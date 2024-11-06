import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import {
  ChangeProfileInputType,
  CreateProfileInputType,
  ProfileTypeGraphQL,
} from '../types/profiles.type.js';
import { Context } from './member.js';
import { Profile } from '@prisma/client';
import { UUID } from 'crypto';

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

export const ProfileMutation = {
  createProfile: {
    type: ProfileTypeGraphQL,
    args: { dto: { type: CreateProfileInputType } },
    resolve: async (_, { dto }, { prisma }: Context) => {
      return prisma.profile.create({ data: dto });
    },
  },
  changeProfile: {
    type: ProfileTypeGraphQL,
    args: {
      id: { type: UUIDType },
      dto: { type: ChangeProfileInputType },
    },
    resolve: async (_, { id, dto }, { prisma }: Context) => {
      return prisma.profile.update({ where: { id }, data: dto });
    },
  },
  deleteProfile: {
    type: UUIDType,
    args: { id: { type: UUIDType } },
    resolve: async (_, { id }, { prisma }: Context) => {
      await prisma.profile.delete({ where: { id } });
      return id;
    },
  },
} satisfies {
  createProfile: GraphQLFieldConfig<void, Context, { dto: Profile }>;
  changeProfile: GraphQLFieldConfig<void, Context, { id: UUID; dto: Profile }>;
  deleteProfile: GraphQLFieldConfig<void, Context, { id: UUID }>;
};
