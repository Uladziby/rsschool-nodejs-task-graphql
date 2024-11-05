import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { Context } from '../queries/member.js';
import { MemberType, MemberTypeIdGql } from './member.type.js';

export const ProfileTypeGraphQL = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberType: {
      type: MemberType,
      resolve: async (
        { memberTypeId }: { memberTypeId: string },
        args,
        { prisma }: Context,
      ) => {
        return await prisma.memberType.findUnique({
          where: {
            id: memberTypeId,
          },
        });
      },
    },
  },
});

export const CreateProfileInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: GraphQLString },
    userId: { type: UUIDType },
  },
});

export const ChangeProfileInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdGql },
  },
});
