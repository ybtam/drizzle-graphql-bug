import {createYoga} from "graphql-yoga";
import {createServer} from "node:http";
import schemaBuilder from "@/schema-builder";

const schema = schemaBuilder()

const yoga = createYoga({schema})
const server = createServer(yoga)

server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql')
})
