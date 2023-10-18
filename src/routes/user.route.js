import express from 'express';
import * as userController from '../controllers/user.controller';
import {
  registerUserValidator,
  loginValidator
} from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to register a new user
router.post('', registerUserValidator, userController.registerUser);

//route to login user
router.post('/login', loginValidator, userController.login);

export default router;
