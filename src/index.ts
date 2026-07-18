import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {typeDefs} from "./schemas/hacker-news-types";
import { resolvers} from "./resolvers/hacker-news";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async (...args)=>{
  }
});

console.log(`🚀  Server ready at: ${url}`);
