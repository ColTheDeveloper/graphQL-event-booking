const express=require("express")
const bodyParser= require("body-parser")
const graphqlHttp= require("express-graphql")
//const  {createHandler}= require("graphql-http/lib/use/express")
//const {GraphQLSchema,GraphQLString,GraphQLObjectType, GraphQLBoolean}= require("graphql")
const {buildSchema, graphiql}= require("graphql")
const dotenv= require("dotenv")
const mongoose= require("mongoose")
const bcrypt= require("bcryptjs")
const eventModel=require("./models/eventModel")
const userModel = require("./models/userModel")
const schema = require("./graphql/schema")
const resolver = require("./graphql/resolver")
const checkAuth = require("./middleware/is-Auth")


const app=express()
dotenv.config()


const MONGODB_URI=process.env.MONGODB_URI
app.use(bodyParser.json())

app.use(checkAuth)

// const schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//         isAdmin: {
//         type: GraphQLBoolean,
//         resolve: () => false,
//         },
//     },
//     }),
//     mutation: new GraphQLObjectType({
//         name:"Mutation",

//     })
// });

app.use("/graphql", graphqlHttp.graphqlHTTP({
    schema:schema,
    rootValue:resolver,
    graphiql:true
}))

mongoose.connect(MONGODB_URI)
        .then(()=>{
            console.log("DB connected Succefully")
        })
        .then(()=>{
            app.listen(2000, ()=>{
                console.log("server is running on port 2000")
            })
        })
        .catch((error)=>console.log(error))

