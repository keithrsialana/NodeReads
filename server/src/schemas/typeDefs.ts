import { gql } from "apollo-server-express";

const typeDefs = gql`
	type Book {
		bookId: String!
		authors: [String!]!
		description: String!
		title: String!
		image: String
		link: String
	}

	type User {
		_id: ID!
		username: String!
		email: String!
		bookCount: Int!
		savedBooks: [Book!]!
	}

	type Auth {
		token: String!
		user: User!
	}

	input AddUserInput {
		username: String!
		email: String!
		password: String!
	}

	input SaveBookInput {
		bookId: String!
		authors: [String!]!
		description: String!
		title: String!
		image: String
		link: String
	}

	type Query {
		me: User!
	}

	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(input: AddUserInput!): Auth
		saveBook(input: SaveBookInput!): User
		removeBook(bookId: String!): User
	}
`;

export default typeDefs;
