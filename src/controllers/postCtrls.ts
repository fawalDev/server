import type { Request, Response, NextFunction } from 'express';
import type IPostError from '../interfaces/response/error/postError.ts';

import Post from '../models/mogooseModels/post.ts';
import ErrorRes from '../models/response/errorRes.ts';
import Res from '../models/response/res.ts';



// Create a new post
async function createPost(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.file)
            throw new ErrorRes<IPostError>('Create post failed', 422, { image: 'Image file is required' });

        const filePath = req.file.path

        const { title, content } = req.body;
        const post = await Post.create({ title, content, imgUrl: filePath });
        res.status(201).json(post);
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
            .skip(skip)
            .limit(limit)
            .lean();

        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}

// Get a single post by ID
async function getPost(req: Request, res: Response, next: NextFunction) {
    try {
        const post = await Post.findById(req.params.id).lean();
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
        const { id, title, content, imgUrl } = req.body;
        const post = await Post.findByIdAndUpdate(
            id,
            { title, content, imgUrl },
            { new: true }
        ).lean();

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
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            throw new ErrorRes('Post not found', 404);
        }
        res.status(200).json(new Res('Post deleted successfully', 200));
    } catch (error) {
        next(error);
    }
}

export default { createPost, getPostsCount, getPosts, getPost, updatePost, deletePost };
