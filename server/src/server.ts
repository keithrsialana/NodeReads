import express from "express";
import db from "./config/connection.js";
import routes from "./routes/index.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

// Import the two parts of a GraphQL schema
import { typeDefs, resolvers } from "./schemas/index.js";
import path from "path";
import { fileURLToPath } from "node:url";

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
	await server.start();
	await db();

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

	app.use("/graphql", expressMiddleware(server)); // implements Apollo Server to Express middleware

	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	// Serve static files from the React app
	app.use(express.static(path.join(__dirname, "../../client/dist")));
	app.use(routes);
	app.get("*", (_req, res) => {
		res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
	});
	
	app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
		console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
	});
};

startApolloServer();
