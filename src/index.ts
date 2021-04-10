import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { MessageResolver } from "./resolver/message";

(async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MessageResolver],
      validate: false,
    }),
  });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})().catch((err) => console.error(err));
