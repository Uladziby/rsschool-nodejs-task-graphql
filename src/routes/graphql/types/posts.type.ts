import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { ContextType } from '../prismaTypes.js';
import { UUIDType } from './uuid.js';

export type PostsType = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

export const PostsTypeGraphQL: GraphQLObjectType<PostsType, ContextType> =
  new GraphQLObjectType({
    name: 'Post',
    fields: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: GraphQLString },
      content: { type: GraphQLString },
    },
  });

export const CreatePostInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
  },
});

export const ChangePostInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
  },
});
