import type IUser from "../interfaces/user.ts";

import { Model, model, Schema } from "mongoose";

interface IUserModel extends Model<IUser> {}

const userSchema = new Schema<IUser, IUserModel>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
})

const User = model<IUser, IUserModel>('User', userSchema);
export default User;