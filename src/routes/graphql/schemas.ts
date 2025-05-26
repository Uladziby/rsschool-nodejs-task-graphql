import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { queries } from './queries.js';
import { mutations } from './mutations.js';
import { MemberTypeQueries } from './queries/member.js';
import { PostsMutation, PostsQueries } from './queries/posts.js';
import { ProfileMutation, ProfileQueries } from './queries/profile.js';
import { UsersMutation, UsersQueries } from './queries/users.js';
import { SubscribeMutations } from './subscribe.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const graphqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: { ...MemberTypeQueries, ...PostsQueries, ...UsersQueries, ...ProfileQueries },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...PostsMutation,
      ...UsersMutation,
      ...ProfileMutation,
      ...SubscribeMutations,
    },
  }),
});
