const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    books: [Book]
  }

  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): String
    saveBook(title: String!, author: String!): Book
    deleteBook(bookId: ID!): String
  }
`;

module.exports = typeDefs;