import { MemberTypeQueries } from './queries/member.js';
import { PostsQueries } from './queries/posts.js';
import { ProfileQueries } from './queries/profile.js';
import { UsersQueries } from './queries/users.js';

export const queries = {
  ...MemberTypeQueries,
  ...PostsQueries,
  ...UsersQueries,
  ...ProfileQueries,
};
