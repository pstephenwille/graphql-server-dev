import { Agent } from 'undici';
import { fetchAllItems, fetchItem, resolveItemsLimitValue, responseIsOkOrThrow } from '../utils';

const customDispatcher = new Agent({
  keepAliveTimeout: 10000,
  connectTimeout: 5000,
  connections: 100,
})

export const resolvers = {
  Query: {
    story: async (parent, args, context, info) => {
     return fetchItem(`https://hacker-news.firebaseio.com/v0/item/${args.id}.json`)
    },
    top500Stories: async (parent, args, contextValue, info) => {
      const ids = await fetchItem('https://hacker-news.firebaseio.com/v0/topstories.json')
      return fetchAllItems(ids, args, info)
    }
  },

  Story: {
    comments: async (parent, args, context, info) => {
      return fetchAllItems(parent.kids, args, info)
    }
  }
}

