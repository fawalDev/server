import type { Request, Response, NextFunction } from 'express';
import type IPostError from '../interfaces/response/error/postError.ts';

import Post from '../models/mogooseModels/post.ts';
import ErrorRes from '../models/response/errorRes.ts';
import Res from '../models/response/res.ts';
import { validationResult } from 'express-validator';
import { createErrorRes } from '../utils/exValidator/createErrorRes.ts';
import IO from '../utils/socket.io.ts';
import User from '../models/mogooseModels/user.ts';
import type { PostEmitVal } from '../types/socket.IO.ts';
import type IPost from '../interfaces/post.ts';



// Create a new post
async function createPost(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.file)
            throw new ErrorRes<IPostError>('Create post failed', 422, { image: 'Image file is required' });

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errorObj = createErrorRes(errors)
            throw new ErrorRes('Create post failed', 422, errorObj);
        }

        const user = await User.findById(req.user?.id)
        if (!user)
            throw new ErrorRes('Create post failed', 422, { user: 'User is not existed' })


        const filePath = req.file.path

        const { title, content } = req.body;
        const post = await Post.create({ title, content, imgUrl: filePath, creator: user._id });
        const postObject = post.toObject();

        user.posts = [...user!.posts, post._id as any]
        user.save()

        const emitVal: PostEmitVal = {
            action: 'create',
            post: {
                ...postObject,
                creator: {
                    _id: user?._id,
                    name: user?.name || user?.email
                } as any
            },
        }
        IO.getIO().emit('posts', emitVal)

        res.status(201).json(postObject);
    } catch (error) {
        next(error);
    }
}

async function getPostsCount(req: Request, res: Response, next: NextFunction) {
    try {
        const count = await Post.countDocuments();
        res.status(200).json(count);
    } catch (error) {
        next(error);
    }
}

// Get all posts
async function getPosts(req: Request, res: Response, next: NextFunction) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const posts = await Post.find()
            .skip(skip).limit(limit)
            .populate({
                path: 'creator',
                select: 'email name'
            })
            .lean();

        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}

// Get a single post by ID
async function getPost(req: Request, res: Response, next: NextFunction) {
    try {
        const post = await Post.findById(req.params.id)
            .populate('creator', 'email name')
            .lean();
        if (!post) {
            throw new ErrorRes('Post not found', 404);
        }
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
}

// Update a post
async function updatePost(req: Request, res: Response, next: NextFunction) {
    try {
        // if (!req.file)
        //     throw new ErrorRes<IPostError>('Update post failed', 422, { image: 'Image file is required' });

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errorObj = createErrorRes(errors)
            throw new ErrorRes('Update post failed', 422, errorObj);
        }

        const { id, title, content, imgUrl } = req.body;
        const post = await Post.findByIdAndUpdate(
            id,
            { title, content, imgUrl },
            { new: true }
        )
            .populate('creator', 'email name')
            .lean();

        const emitVal: PostEmitVal = {
            action: 'update',
            post: post as IPost
        }

        IO.getIO().emit('posts', emitVal)

        if (!post) {
            throw new ErrorRes('Post not found', 404);
        }
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
}

// Delete a post
async function deletePost(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.params.id)
            throw new ErrorRes('Post ID is required', 422);

        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post)
            throw new ErrorRes('Post not found', 404);

        const emitVal: PostEmitVal = {
            action: 'delete',
            postId: String(post._id)
        }

        IO.getIO().emit('posts', emitVal)

        res.status(200).json(new Res('Post deleted successfully', 200));
    } catch (error) {
        next(error);
    }
}

export default { createPost, getPostsCount, getPosts, getPost, updatePost, deletePost };
