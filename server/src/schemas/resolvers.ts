import {User} from '../models/index.js';

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        }
    },
};
export default resolvers;
