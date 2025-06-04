import express, { Router } from 'express';
import { isValidLogin, isValidSignup } from '../middlewares/exValidator/authValidator.js';
import autCtrl from '../controllers/authCtrl.js';
const authRoute = Router();
authRoute.use(express.json());
authRoute.post('/login', isValidLogin, autCtrl.login);
authRoute.post('/signup', isValidSignup, autCtrl.signup);
export default authRoute;
