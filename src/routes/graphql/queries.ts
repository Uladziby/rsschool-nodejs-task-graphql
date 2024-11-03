import { MemberTypeQueries } from './queries/member-types.js';
import { PostsQueries } from './queries/posts.js';
import { UsersQueries } from './queries/users.js';

export const queries = {
  ...MemberTypeQueries,
  ...PostsQueries,
  ...UsersQueries,
};

//...ProfilesTypeQueries,
//...UsersTypeQueries,
