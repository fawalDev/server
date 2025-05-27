import type { Request, Response, NextFunction } from 'express';

import Post from '../models/mogooseModels/post.ts';
import ErrorRes from '../models/errorResponse.ts';
import Res from '../models/res.ts';

// Create a new post
async function createPost(req: Request, res: Response, next: NextFunction) {
    try {
        const { title, content, imgUrl } = req.body;
        const post = await Post.create({ title, content, imgUrl });
        res.status(201).json(new Res('Post created successfully', 201, post));
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

        const [posts, total] = await Promise.all([
            Post.find()
                .skip(skip)
                .limit(limit)
                .lean(),
            Post.countDocuments()
        ]);

        const totalPages = Math.ceil(total / limit);

        res.status(200).json(new Res('Posts fetched successfully', 200, {
            posts,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: total,
                itemsPerPage: limit
            }
        }));
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
        res.status(200).json(new Res('Post fetched successfully', 200, post));
    } catch (error) {
        next(error);
    }
}

// Update a post
async function updatePost(req: Request, res: Response, next: NextFunction) {
    try {
        const { title, content, imgUrl } = req.body;
        const post = await Post.findByIdAndUpdate(
            req.params.id, 
            { title, content, imgUrl },
            { new: true }
        ).lean();
        
        if (!post) {
            throw new ErrorRes('Post not found', 404);
        }
        res.status(200).json(new Res('Post updated successfully', 200, post));
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

export default { createPost, getPosts, getPost, updatePost, deletePost };
