import { GraphQLFieldConfig, GraphQLList, GraphQLString } from 'graphql';
import {
  ChangePostInputType,
  CreatePostInputType,
  PostsTypeGraphQL,
} from '../types/posts.type.js';
import { ContextType } from '../prismaTypes.js';

type PostsQueriesType = {
  posts: GraphQLFieldConfig<unknown, ContextType>;
  post: GraphQLFieldConfig<unknown, ContextType>;
};

type PostsMutationType = {
  createPost: GraphQLFieldConfig<unknown, ContextType>;
  changePost: GraphQLFieldConfig<unknown, ContextType>;
};

export const PostsQueries: PostsQueriesType = {
  posts: {
    type: new GraphQLList(PostsTypeGraphQL),
    async resolve(__, _, context) {
      return context.prisma.post.findMany();
    },
  },
  post: {
    type: PostsTypeGraphQL,
    args: { id: { type: GraphQLString } },
    async resolve(__, { id }, context) {
      return context.prisma.post.findUnique({ where: { id } });
    },
  },
};

export const PostsMutation: PostsMutationType = {
  createPost: {
    type: PostsTypeGraphQL,
    args: { input: { type: CreatePostInputType } },
    async resolve(__, { input }, context) {
      return context.prisma.post.create({ data: input });
    },
  },
  changePost: {
    type: PostsTypeGraphQL,
    args: { id: { type: GraphQLString }, input: { type: ChangePostInputType } },
    async resolve(__, { id, input }, context) {
      return context.prisma.post.update({ where: { id }, data: input });
    },
  },
};
