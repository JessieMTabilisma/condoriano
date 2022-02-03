import { gql } from 'apollo-server'
const typeDefs = gql`
  type User {
    name: String!
    email: String!
    password: String!
  }
  type Mutation {
    signupUser(data: UserCreateInput!): AuthPayLoad!
    signinUser(data: UserLoginInput!): AuthPayLoad!
  }
  input UserCreateInput {
    email: String!
    name: String!
    password: String!
  }
  input UserLoginInput {
    email: String!
    password: String!
  }
  type AuthPayLoad {
    token: String!
  }
  type Query {
    users: [User]
  }
`
export default typeDefs
