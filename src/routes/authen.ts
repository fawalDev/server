import express, { Router } from 'express';
import { isValidLogin, isValidSignup } from '../middlewares/exValidator/authValidator.ts';
import autCtrl from '../controllers/authCtrl.ts';

const authRoute = Router();

authRoute.use(express.json());

authRoute.post('/login', isValidLogin, autCtrl.login);

authRoute.post('/signup', isValidSignup, autCtrl.signup);

export default authRoute;