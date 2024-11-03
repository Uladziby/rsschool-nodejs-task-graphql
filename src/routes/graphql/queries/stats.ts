import { GraphQLFieldConfig, GraphQLList } from 'graphql';
import { ContextType } from '../prismaTypes.js';
import { StatsTypeGraphQL } from '../types/stats.type..js';

type StatsQueryType = {
  stat: GraphQLFieldConfig<unknown, ContextType>;
};
/* 
export const StatsQueries: StatsQueryType = {
  stat: {
    type: new GraphQLList(StatsTypeGraphQL),
    async resolve(__, _, context) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return context.prisma.stats.findMany();
    },
  },
};
 */
