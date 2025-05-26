import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { MemberTypeId } from '../../member-types/schemas.js';
import { Context } from '../queries/member.js';
import { IContext, Member } from '../types.js';

export const MemberTypeIdGql: GraphQLEnumType = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    [MemberTypeId.BASIC]: { value: MemberTypeId.BASIC },
    [MemberTypeId.BUSINESS]: { value: MemberTypeId.BUSINESS },
  },
});

export const MemberType: GraphQLObjectType<Member, IContext> = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: { type: new GraphQLNonNull(MemberTypeIdGql) },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  },
});
