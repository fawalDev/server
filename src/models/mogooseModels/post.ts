import type IPost from "../../interfaces/post.ts";

import { Model, model, Schema } from "mongoose";

export interface IPostModel extends Model<IPost> { }

const postSchema = new Schema<IPost, IPostModel>({
    title: { type: String, required: true, trim: true, },
    content: { type: String, required: true, trim: true, },
    imgUrl: { type: String, required: false, trim: true, }
}, {
    timestamps: true
})

const Post = model<IPost, IPostModel>('Post', postSchema);
export default Post;