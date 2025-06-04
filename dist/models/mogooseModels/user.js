import { Model, model, Schema } from "mongoose";
const userSchema = new Schema({
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String, trim: true },
    password: { type: String, required: true, trim: true },
    isAdmin: { type: Boolean, default: false },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});
const User = model('User', userSchema);
export default User;
