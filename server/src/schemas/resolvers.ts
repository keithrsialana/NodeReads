import { User } from "../models/index.js";
import { signToken } from "../services/auth.js";

const resolvers = {
	Query: {
		me: async (_parent: any, _args: any, { user }: any) => {
			return await User.findById(user._id);
		},
	},
	Mutation: {
		// Resolver for the 'login' mutation
		login: async (_: any, { email, password }: any) => {
			const user = await User.findOne({ email });
			if (!user) {
				throw new Error("Can't find this user");
			}

			const correctPw = await user.isCorrectPassword(password);
			if (!correctPw) {
				throw new Error("Wrong password!");
			}

			const token = signToken(user.username, user.email, user._id);
			return { token, user };
		},

		// Resolver for the 'addUser ' mutation
		addUser: async (_: any, { input }: any) => {
			const user = await User.create(input);
			const token = signToken(user.username, user.email, user._id);
			return { token, user };
		},

		// Resolver for the 'saveBook' mutation
		saveBook: async (_: any, { input }: any) => {
			// Find the user by username
			const user = await User.findOne({ username: input.username });

			if (!user) {
				throw new Error("User not found!"); // Handle the case where the user does not exist
			}
		
			// Add the book to the user's savedBooks
			const updatedUser  = await User.findOneAndUpdate(
				{ _id: user._id },
				{ $addToSet: { savedBooks: input } }, // Save the book to the user's savedBooks
				{ new: true, runValidators: true }
			);
		
			return updatedUser ;
		},

		// Resolver for the 'removeBook' mutation
		removeBook: async (_: any, { bookId, username }: any) => {
			// Find the user by username
			const user = await User.findOne({ username });
		
			if (!user) {
				throw new Error("User not found!"); // Handle the case where the user does not exist
			}
		
			// Remove the book from the user's savedBooks
			const updatedUser  = await User.findOneAndUpdate(
				{ _id: user._id },
				{ $pull: { savedBooks: { bookId } } }, // Remove the book by bookId
				{ new: true }
			);
		
			if (!updatedUser ) {
				throw new Error("Couldn't find user with this id!");
			}
		
			return updatedUser ;
		},
	},
};
export default resolvers;
