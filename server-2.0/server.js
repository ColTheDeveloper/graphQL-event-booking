const express=require("express")
const bodyParser= require("body-parser")
const  {createHandler}= require("graphql-http/lib/use/express")
const {GraphQLSchema,GraphQLString,GraphQLObjectType, GraphQLBoolean}= require("graphql")

const app=express()

//const MONGODB_URI=process.env.MONGODB_URI
app.use(bodyParser.json())

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'getUser',
      fields: {
        user: {
          type: GraphQLObjectType,
          resolve: () => 'world',
        },
      },
    }),
});

app.use('/graphql', createHandler(schema));

app.listen(2020,()=>console.log("graphQl server is running on port 2020"))
