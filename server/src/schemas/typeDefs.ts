import { gql } from "apollo-server-express";

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [BookDocument!]!
        bookCount: Int!
    }

    type BookDocument {
        _id: ID!
        bookId: String!
        title: String!
        authors: [String!]
        image: String!
        link: String!
        }
`;

export default typeDefs;