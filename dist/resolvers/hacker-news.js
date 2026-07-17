import { GraphQLError } from "graphql/error";
import { Agent } from 'undici';
const customDispatcher = new Agent({
    keepAliveTimeout: 10000,
    connectTimeout: 5000,
    connections: 100,
});
export const resolvers = {
    Query: {
        top500Stories: async (parent, args, contextValue, info) => {
            const topStoryIds = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
            if (!topStoryIds.ok) {
                throw new GraphQLError('oops!');
            }
            const storyIds = await topStoryIds.json();
            const storyDataResp = storyIds.map(async (id) => {
                const storyResp = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
                    dispatcher: customDispatcher
                });
                if (!storyResp.ok) {
                    throw new GraphQLError(`failed fetching story item: ${id}`);
                }
                const storyData = storyResp.json();
                console.log('%c...data', 'color:gold', storyData);
                return storyData;
            });
            return storyDataResp;
        }
    }
};
