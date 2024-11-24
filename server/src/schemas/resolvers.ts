import { User } from "../models/index.js";
import { signToken } from "../services/auth.js";

interface LoginArgs {
	email: string;
	password: string;
}

interface ProfileArgs {
	profileId: string;
}

interface AddUserArgs{
	userObj: {
		username:string;
		email: string;
		password: string;
	}
}

interface BookArgs {
	input : {
		bookId: string,
        authors: string,
        description: string,
        title: string,
        image: string,
        link: string,
        username: string,
	}
}

interface RemoveBookArgs {
	bookId: string,
	username: string
}

const resolvers = {
	Query: {
		profiles: async (_parent:any) => {
			return await User.find();
		},
		me: async (_parent: any, { profileId }: ProfileArgs) => {
			return await User.findById(profileId);
		},
	},
	Mutation: {
		// Resolver for the 'login' mutation
		login: async (_parent: any, { email, password }: LoginArgs) => {
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
		addUser: async (_parent: any, { userObj }: AddUserArgs) => {
			const user = await User.create(userObj);
			const token = signToken(user.username, user.email, user._id);
			return { token, user };
		},

		// Resolver for the 'saveBook' mutation
		saveBook: async (_parent: any, { input }: BookArgs) => {
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
		removeBook: async (_parent: any, { bookId, username }: RemoveBookArgs) => {
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
