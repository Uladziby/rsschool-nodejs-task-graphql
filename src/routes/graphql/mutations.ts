import { PostsMutation } from './queries/posts.js';
import { ProfileMutation } from './queries/profile.js';
import { UsersMutation } from './queries/users.js';
import { SubscribeMutations } from './subscribe.js';

export const mutations = {
  ...PostsMutation,
  ...UsersMutation,
  ...ProfileMutation,
  ...SubscribeMutations,
};
