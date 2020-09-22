const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
  _id: ID!
  name: String!
  email: String!
  password: String!
  avatar: String
  date: String
}
type Auth {
  token: String!
}
input UserInput {
  name: String!
  email: String!
  password: String!
  date: String
  token: String!
}
input UserUpdate {
  _id: ID!
  name: String!
  email: String!
  password: String!
  token: String!
} 
input UserRemove {
  _id: ID!
  token: String!
}
input UserAuth {
  email: String!
  password: String!
} 
type RootQuery {
  users: [User!]!
  findUser(id: ID!): User
}
type RootMutation {
  createUser(userInput: UserInput): User
  deleteUser(userRemove: UserRemove): User
  updateUser(userUpdate: UserUpdate): User
  authUser(userAuth: UserAuth): Auth
}
schema {
  query: RootQuery
  mutation: RootMutation
}
`);