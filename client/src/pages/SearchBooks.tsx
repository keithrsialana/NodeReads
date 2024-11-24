import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';

// Inside your SearchBooks component
const [saveBook] = useMutation(SAVE_BOOK);

const handleSaveBook = async (bookId: string) => {
  const bookToSave = searchedBooks.find((book) => book.bookId === bookId)!;
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return false;
  }

  try {
    const { data } = await saveBook({
      variables: { input: bookToSave },
    });

    // Logic to save the book ID to state
    setSavedBookIds([...savedBookIds, bookToSave.bookId]);
  } catch (err) {
    console.error(err);
  }
};