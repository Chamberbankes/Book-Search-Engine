const { User, Book } = require('../../models');

const resolvers = {
    Query: {
        me: async (_, __, context) => {
            const user = context.user;
            if (!user) throw new Error('Not authenticated');
            return User.findById(user.id).populate('books');
        },
    },

    Mutation: {
        createUser: async (_, { username, email, password }) => {
            const user = new User({ username, email, password });
            await user.save();
            return user;
        },

        saveBook: async (_, { title, author }, context) => {
            const user = context.user;
            if (!user) throw new Error('Not authenticated');

            const book = new Book({ title, author, userId: user.id });
            await book.save();

            user.books.push(book);
            await user.save();

            return book;
        },

        deleteBook: async (_, { bookId }, context) => {
            const user = context.user;
            if (!user) throw new Error('Not authenticated');

            await Book.findByIdAndDelete(bookId);
            return 'Book deleted successfully';
        }
    }
};

module.exports = resolvers;
