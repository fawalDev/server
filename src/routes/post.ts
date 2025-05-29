import express, { Router } from 'express';
import postCtrl from '../controllers/postCtrls.ts';
import isAuth from '../middlewares/isAuth.ts';
import { multerImgMw } from '../middlewares/multer.ts';

const postRoute = Router();

postRoute.use(express.json());

// Apply authentication middleware to all post routes
postRoute.use(isAuth, multerImgMw);

// Post routes
postRoute.post('/', postCtrl.createPost);
postRoute.get('/', postCtrl.getPosts);
postRoute.get('/:id', postCtrl.getPost);
postRoute.put('/:id', postCtrl.updatePost);
postRoute.delete('/:id', postCtrl.deletePost);

export default postRoute;