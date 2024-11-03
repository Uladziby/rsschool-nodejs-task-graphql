import { MemberType } from '@prisma/client';
import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { ContextType } from '../prismaTypes.js';

export const MemberTypeIdGql: GraphQLEnumType = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: { value: 'BASIC' },
    BUSINESS: { value: 'BUSINESS' },
  },
});

export const MemberTypesQueries: GraphQLObjectType<MemberType, ContextType> =
  new GraphQLObjectType({
    name: 'MemberTypesQueries',
    fields: {
      id: { type: new GraphQLNonNull(MemberTypeIdGql) },
      discount: { type: GraphQLFloat },
      postsLimitPerMonth: { type: GraphQLInt },
    },
  });
