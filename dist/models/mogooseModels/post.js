import { Model, model, Schema } from "mongoose";
const postSchema = new Schema({
    title: { type: String, required: true, trim: true, },
    content: { type: String, required: true, trim: true, },
    imgUrl: { type: String, required: false, trim: true, },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});
const Post = model('Post', postSchema);
export default Post;
