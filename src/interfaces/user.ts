import type { Schema } from "mongoose";

export default interface IUser {
    email: string;
    name: string;
    password: string;
    isAdmin: boolean;
    posts: Schema.Types.ObjectId[]
}
