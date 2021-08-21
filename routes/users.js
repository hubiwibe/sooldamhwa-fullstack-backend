import { Router } from 'express';
import { body } from 'express-validator';
import * as userController from '../controller/user.js';
const router = Router();

const validateUser = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('name should be at least 2 characters'),
];

// GET /users
router.get('/', userController.getUsers);

// POST /users
router.post('/', validateUser, userController.createUsers);

// DELETE /users
router.delete('/:name', validateUser, userController.deleteUser);

export default router;
