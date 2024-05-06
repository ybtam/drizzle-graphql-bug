import {buildSchema} from "drizzle-graphql";
import {db} from "../db";
import {GraphQLObjectType, GraphQLSchema} from "graphql/type";
import {GraphQLNonNull} from "graphql/type/definition";
import {users} from "@/user/schema";

export const { entities} = buildSchema(db)

export default function schemaBuilder() {
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "Query",
      fields: {
        ...entities.queries,

      }
    }),
    mutation: new GraphQLObjectType({
      name: "Mutation",
      fields: {
        ...entities.mutations,
        addUser: {
          type: new GraphQLNonNull(entities.types.UsersItem),
          args: {
            value: {
              type: entities.inputs.UsersInsertInput
            }
          },
          resolve: async (_, {value}) => {
            const result = await db.insert(users).values(value).returning()

            return result[0]
          }
        }
      }
    }),
    types: [...Object.values(entities.types), ...Object.values(entities.inputs)],
  });
}
