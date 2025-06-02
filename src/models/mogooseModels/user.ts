import type IUser from "../../interfaces/user.ts";

import { Model, model, Schema } from "mongoose";

interface IUserModel extends Model<IUser> { }

const userSchema = new Schema<IUser, IUserModel>({
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String, trim: true },
    password: { type: String, required: true, trim: true },
    isAdmin: { type: Boolean, default: false },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
})

const User = model<IUser, IUserModel>('User', userSchema);
export default User;