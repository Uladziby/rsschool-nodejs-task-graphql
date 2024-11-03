import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import { ContextType, MemberType } from '../prismaTypes.js';
import { UUIDType } from './uuid.js';
import { UsersTypeGraphQL } from './users.type.js';

type ProfileType = {
  id: typeof UUIDType;
  isMale: boolean;
  yearOfBirth: number;
  memberType: MemberType;
};

export const ProfileTypeGraphQL: GraphQLObjectType<ProfileType, ContextType> =
  new GraphQLObjectType({
    name: 'Profile',
    fields: {
      id: { type: new GraphQLNonNull(UUIDType) },
      isMale: { type: GraphQLBoolean },
      yearOfBirth: { type: GraphQLInt },
      memberTypeId: { type: GraphQLString },
      user: {
        type: UsersTypeGraphQL,
        async resolve(src, _, context) {
          return context.prisma.user.findUnique({ where: { id: src.id.toString() } });
        },
      },
    },
  });
