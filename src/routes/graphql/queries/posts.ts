import { GraphQLBoolean, GraphQLFieldConfig, GraphQLList } from 'graphql';
import {
  ChangePostInputType,
  CreatePostInputType,
  PostsTypeGraphQL,
} from '../types/posts.type.js';
import { Context } from './member.js';
import { UUIDType } from '../types/uuid.js';
import { UUID } from 'crypto';
import { Post } from '@prisma/client';

export const PostsQueries = {
  posts: {
    type: new GraphQLList(PostsTypeGraphQL),
    async resolve(__, _, { prisma }: Context) {
      return prisma.post.findMany();
    },
  },
  post: {
    type: PostsTypeGraphQL,
    args: { id: { type: UUIDType } },
    async resolve(__, { id }, { prisma }: Context) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return prisma.post.findUnique({ where: { id } });
    },
  },
};

export const PostsMutation = {
  createPost: {
    type: PostsTypeGraphQL,
    args: { dto: { type: CreatePostInputType } },
    async resolve(__, { dto }, { prisma }: Context) {
      return prisma.post.create({ data: dto });
    },
  },
  changePost: {
    type: PostsTypeGraphQL,
    args: {
      id: { type: UUIDType },
      dto: { type: ChangePostInputType },
    },
    async resolve(_, { id, dto }, { prisma }: Context) {
      return prisma.post.update({ where: { id }, data: dto });
    },
  },
  deletePost: {
    type: GraphQLBoolean,
    args: { id: { type: UUIDType } },
    async resolve(_, { id }, { prisma }: Context) {
      await prisma.post.delete({ where: { id } });
      return true;
    },
  },
} satisfies {
  createPost: GraphQLFieldConfig<void, Context, { dto: Post }>;
  changePost: GraphQLFieldConfig<void, Context, { id: UUID; dto: Post }>;
  deletePost: GraphQLFieldConfig<void, Context, { id: UUID }>;
};
