import express from 'express';
const router = express.Router();
import {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
  deleteUser
} from '../../controllers/user-controller.js';

// import middleware
import { authenticateToken } from '../../services/auth.js';

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/')
  .post(createUser)
  .put(authenticateToken, saveBook)
  .delete(deleteUser);

router.route('/')

router.route('/login').post(login);

router.route('/me').get(authenticateToken, getSingleUser);

router.route('/books/:bookId').delete(authenticateToken, deleteBook);

export default router;
