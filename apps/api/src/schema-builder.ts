import {buildSchema} from "drizzle-graphql";
import {db} from "../db";
import {GraphQLList, GraphQLObjectType, GraphQLSchema} from "graphql/type";
import {GraphQLNonNull} from "graphql/type/definition";

export const { entities} = buildSchema(db)

export default function schemaBuilder() {
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "Query",
      fields: {
        ...entities.queries,
        getUserLogs: {
          resolve: () => [],
          type: new GraphQLList(new GraphQLNonNull(entities.types.UserlogsItem)),
        }
      },
    }),
    mutation: new GraphQLObjectType({
      name: "Mutation",
      fields: {
        ...entities.mutations
      }
    }),
    types: [...Object.values(entities.types), ...Object.values(entities.inputs)],
  });
}
