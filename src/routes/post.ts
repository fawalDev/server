import express, { Router } from 'express';
import postCtrl from '../controllers/postCtrls.js';
import isAuth from '../middlewares/isAuth.js';
import { multerImgMw } from '../middlewares/multer.js';
import { addPostValidator, updatePostValidator } from '../middlewares/exValidator/postValidator.js';

const postRoute = Router();

postRoute.get('/', postCtrl.getPosts);
postRoute.get('/:id', postCtrl.getPost);


// Apply authentication middleware to all post routes
postRoute.use(isAuth, multerImgMw);

postRoute.post('/', addPostValidator, postCtrl.createPost);
postRoute.put('/', updatePostValidator, postCtrl.updatePost);
postRoute.delete('/:id', postCtrl.deletePost);

export default postRoute;